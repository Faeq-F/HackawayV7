import pygame
import sys
import math
from collections import defaultdict
from heapq import *

# Initialize Pygame
pygame.init()

# Constants
WIDTH, HEIGHT = 800, 600
WHITE = (255, 255, 255)
RED = (255, 0, 0)
CAR_WIDTH, CAR_HEIGHT = 60, 100
ROAD_WIDTH = 5
CAR_SPEED = 1.5

# Create the game window
screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("2D Car Game with Roads")

# Clock for controlling the frame rate
clock = pygame.time.Clock()

# Define roads (lines)
roads = [
    [pygame.math.Vector2(100, 100), pygame.math.Vector2(700, 100)],
    [pygame.math.Vector2(700, 100), pygame.math.Vector2(700, 500)],
    [pygame.math.Vector2(700, 500), pygame.math.Vector2(100, 500)],
    [pygame.math.Vector2(100, 500), pygame.math.Vector2(100, 100)],
    [pygame.math.Vector2(100, 300), pygame.math.Vector2(700, 300)],
]

# Function to draw roads
def draw_roads():
    for road in roads:
        pygame.draw.line(screen, (0, 0, 0), road[0], road[1], ROAD_WIDTH)

# Function to draw coordinates
def draw_coordinates():
    font = pygame.font.Font(None, 24)
    points = [point for road in roads for point in road]
    for i, point in enumerate(points, start=1):
        text = font.render(f"{i}: {point.x},{point.y}", True, (0, 0, 0))
        screen.blit(text, point)

# Function to check if a point has passed a line segment
def has_passed_line(point, line_start, line_end):
    return (line_end - line_start).dot(point - line_end) > 0

# Dijkstra's algorithm
def shortest_path(graph, start, end):
    queue, seen = [(0, start, [])], set()
    while queue:
        (cost, v1, path) = heappop(queue)
        if v1 not in seen:
            seen.add(v1)
            path = path + [v1]
            if v1 == end:
                return cost, path

            for (v2, cost2) in graph.get(v1, ()):
                if v2 not in seen:
                    heappush(queue, (cost + cost2, v2, path))

    return float("inf"), []

# Get the starting and ending positions from the user
start_x, start_y = map(float, input("Enter the starting position (x,y): ").split(','))
end_x, end_y = map(float, input("Enter the ending position (x,y): ").split(','))

# Car properties
car_img = pygame.Surface((CAR_WIDTH, CAR_HEIGHT), pygame.SRCALPHA)
car_img.fill(RED)
car_rect = car_img.get_rect(center=(start_x, start_y))

# Create the graph
graph = defaultdict(list)
for i in range(len(roads)):
    start, end = roads[i]
    distance = start.distance_to(end)
    graph[tuple(start)].append((tuple(end), distance))
    graph[tuple(end)].append((tuple(start), distance))

# Find the shortest path
cost, path = shortest_path(graph, (start_x, start_y), (end_x, end_y))
path = [pygame.math.Vector2(point) for point in path]

# Keep track of the current road index
current_road_index = 0

# Game loop
running = True
while running:
    screen.fill(WHITE)

    # Event handling
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False

    # Move the car along the line
    car_pos = pygame.math.Vector2(car_rect.center)
    if current_road_index < len(path) - 1:
        line_start, line_end = path[current_road_index], path[current_road_index + 1]
        line_vec = line_end - line_start
        car_pos += CAR_SPEED * line_vec.normalize()

        # Check if the car has passed the end of the line
        if has_passed_line(car_pos, line_start, line_end):
            # Move to the next road
            current_road_index += 1
            if current_road_index < len(path) - 1:
                line_start, line_end = path[current_road_index], path[current_road_index + 1]
                car_pos = line_start

    # Check if the car has reached the end position
    if car_pos.distance_to(pygame.math.Vector2(end_x, end_y)) < 1:
        print("The car has reached its destination!")
        running = False

    # Update the car's position
    car_rect.center = car_pos

    # Draw the roads and car
    draw_roads()
    screen.blit(car_img, car_rect)

    # Draw the coordinates
    draw_coordinates()

    # Update the display
    pygame.display.update()

    # Cap the frame rate
    clock.tick(60)

pygame.quit()
sys.exit()

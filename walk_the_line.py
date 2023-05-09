import random, math
import tkinter as tk
from time import sleep


root = tk.Tk()
root.title("Walk the Route")


canvas = tk.Canvas(root, width=800, height=600, bg="black")
canvas.pack()


def generate_route_coords(num_points, distance, canvas_width, canvas_height):
    route_coords = [canvas_width / 2, canvas_height / 2]
    angle = 0
    for _ in range(num_points - 1):
        angle += random.uniform(-math.pi / 4, math.pi / 4)
        x = route_coords[-2] + distance * math.cos(angle)
        y = route_coords[-1] + distance * math.sin(angle)
        route_coords.extend([x, y])
    return route_coords

canvas_width = 800
canvas_height = 600
num_points = 30
distance_between_coords = 5
route_coords = generate_route_coords(num_points, distance_between_coords, canvas_width, canvas_height)

route = canvas.create_line(*route_coords, fill="pale green", width=4)


def animate_route(start_distance, end_distance):
   
    while start_distance <= end_distance:
        if root:
            canvas.delete("animated_route")
            index = max(2 * (int(start_distance / 5) + 1), 4)
            canvas.create_line(*route_coords[:index], fill="green", width=4, tags="animated_route")
            root.update()
            sleep(0.05)
            start_distance += 2
        else:
            break

total_distance_walked = 0


while True:
    try:
        distance = float(input("How far do you want to walk (in pixels)? "))
        end_distance = total_distance_walked + distance
        animate_route(total_distance_walked, end_distance)
        total_distance_walked = end_distance
    except ValueError:
        print("Invalid input. Please enter a number.")
    except KeyboardInterrupt:
        print("Exiting...")
        break

root.mainloop()


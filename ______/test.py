import tkinter as tk
import random

class MainWindow(tk.Tk):
    def __init__(self, *args, **kwargs):
        tk.Tk.__init__(self, *args, **kwargs)
        self.title("Main Window")
        self.geometry("{0}x{1}+0+0".format(self.winfo_screenwidth(), self.winfo_screenheight()))

        start_button = tk.Button(self, text="Start", height=20, width=20, bg='green', command=self.open_graph)
        start_button.place(relx=0.5, rely=0.5, anchor="s")

        exit_button = tk.Button(self, text="Exit", height=20, width=20, bg='red', command=self.destroy)
        exit_button.place(relx=0.5, rely=0.5, anchor="n")

        self.graph_details = tk.StringVar()
        self.entry = tk.Entry(self, textvariable=self.graph_details)
        self.entry.place(relx=0.5, rely=0.4, anchor="s")

    def open_graph(self):
        graph_data = self.graph_details.get()
        self.graph_window = GraphWindow(self, graph_data)

class GraphWindow(tk.Toplevel):
    def __init__(self, parent, graph_data, *args, **kwargs):
        tk.Toplevel.__init__(self, parent, *args, **kwargs)
        self.title("Graph Window")
        self.geometry("{0}x{1}+0+0".format(self.winfo_screenwidth(), self.winfo_screenheight()))

        self.canvas = tk.Canvas(self, width=self.winfo_screenwidth(), height=self.winfo_screenheight())
        self.canvas.pack()
        
        graph_dict = eval(graph_data)
        self.nodes = []
        for node in graph_dict:
            x, y = graph_dict[node]
            node = self.canvas.create_oval(x, y, x + 30, y + 30, fill="red", activefill="blue")
            self.nodes.append(node)
            self.canvas.tag_bind(node, "<Button-1>", lambda event, i=node: self.click_node(event, i))
 
        reset_button = tk.Button(self, text="Reset", command=self.reset)
        reset_button.place(relx=0.5, rely=0.5, anchor="n")
        self.selected_nodes = []
        self.paths = []
    

    def click_node(self, event, node):
        self.canvas.itemconfig(self.nodes[node], fill="blue")
        self.selected_nodes.append(self.nodes[node])

        if len(self.selected_nodes) >= 2:
            x1, y1, x2, y2 = self.canvas.coords(self.selected_nodes[-2])
            x3, y3, x4, y4 = self.canvas.coords(self.selected_nodes[-1])
            cx1, cy1 = (x1 + x2) / 2, (y1 + y2) / 2
            cx2, cy2 = (x3 + x4) / 2, (y3 + y4) / 2
            self.paths.append(self.canvas.create_line(cx1, cy1, cx2, cy2, fill="black"))

    def run_function(self, x, y):
        print(f"Node clicked at x: {x} and y: {y}")
 
    

app = MainWindow()
app.mainloop()

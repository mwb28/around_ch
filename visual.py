import osmnx as ox

# Definiere den Ort, für den der Graph erstellt werden soll
place_name = 'Switzerland'

# Erstelle einen Graphen für das gewählte Gebiet
G = ox.graph_from_place(place_name, network_type='all')

# Konvertiere den Graphen in zwei separate GeoDataFrames für Knoten und Kanten
gdf_nodes, gdf_edges = ox.graph_to_gdfs(G)

# Finde die nächstgelegenen Knoten für den Start- und Endpunkt
start_point = (47.3769, 8.5417)
end_point = (47.3899, 8.5667)
start_node = ox.distance.nearest_nodes(G, X=(start_point[1],), Y=(start_point[0],))[0]
end_node = ox.distance.nearest_nodes(G, X=(end_point[1],), Y=(end_point[0],))[0]

# Berechne die Route zwischen den Start- und Zielknoten
route = ox.shortest_path(G, start_node, end_node, weight='length')

# Extrahiere die Kanten-IDs für die Route aus dem Graphen G
route_edges = [(u, v, key) for u, v, key in zip(route[:-1], route[1:], range(len(route)))]

# Erstelle einen Geodatenrahmen für die Route, indem du die entsprechenden Kanten aus gdf_edges extrahierst
gdf_route = gdf_edges.loc[gdf_edges.index.isin(route_edges)].copy()

# Visualisiere die Route
ax = gdf_edges.plot(figsize=(12, 12), linewidth=0.5, edgecolor='gray')
gdf_route.plot(ax=ax, linewidth=3, edgecolor='red')

# Speichere die Karte als PNG-Datei
fig = ax.get_figure()
fig.savefig('route.png', dpi=300)

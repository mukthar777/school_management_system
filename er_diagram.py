from graphviz import Digraph

# Create a new directed graph
dot = Digraph(comment='School Management System ER Diagram', format='png')

# Define entities with rectangles
dot.node('T', 'Teachers\n----------------\nregister_no (PK)\nname\ncontact\nsubject_id (FK)', shape='rectangle')
dot.node('S', 'Students\n----------------\nadmission_no (PK)\nname\ncontact\nenrollment_date\nclass_id (FK)', shape='rectangle')
dot.node('SB', 'Subjects\n----------------\nsubject_id (PK)\nname', shape='rectangle')
dot.node('C', 'Classes\n----------------\nclass_id (PK)\nname', shape='rectangle')
dot.node('G', 'Grades\n----------------\ngrade_id (PK)\ngrade\nadmission_no (FK)\nsubject_id (FK)', shape='rectangle')

# Define relationships with diamonds
dot.node('R1', 'Teaches', shape='diamond')
dot.node('R2', 'Enrolled', shape='diamond')
dot.node('R3', 'Contains', shape='diamond')
dot.node('R4', 'Assigned', shape='diamond')

# Draw relationships
dot.edge('T', 'R1', label='1')
dot.edge('SB', 'R1', label='M')

dot.edge('C', 'R2', label='1')
dot.edge('S', 'R2', label='M')

dot.edge('C', 'R3', label='1')
dot.edge('SB', 'R3', label='M')

dot.edge('S', 'R4', label='1')
dot.edge('SB', 'R4', label='M')

# Link entities to relationships
dot.edge('R1', 'T', label='')
dot.edge('R1', 'SB', label='')

dot.edge('R2', 'S', label='')
dot.edge('R2', 'C', label='')

dot.edge('R3', 'C', label='')
dot.edge('R3', 'SB', label='')

dot.edge('R4', 'S', label='')
dot.edge('R4', 'SB', label='')

# Save the diagram
file_path = '/mnt/data/school_management_system_er_diagram.png'
dot.render(filename=file_path, cleanup=True)

file_path

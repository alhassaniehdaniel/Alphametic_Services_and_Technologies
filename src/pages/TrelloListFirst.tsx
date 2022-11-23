import "./TrelloListFirst.css";
import { useState } from "react";

// Beautiful DnD
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";

//Styles container and card
const styles = {
  maincontainer: {
    display: "flex",
  },
  container: {
    display: "flex",
    backgroundColor: "#eee",
    borderRadius: 3,
    width: 300,
    padding: 8,
    margin: 8,
  },
  card: {
    marginBottom: 20,
  },
};

const listContents1 = [
  {
    id: "1",
    text: "First ticket ",
  },
  {
    id: "2",
    text: "Second ticket",
  },
  {
    id: "3",
    text: "Third ticket",
  },
];
const listContents2 = [
  {
    id: "4",
    text: "First ticket ",
  },
  {
    id: "5",
    text: "Second ticket",
  },
  {
    id: "6",
    text: "Third ticket",
  },
];

//Styles for draggable items
const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
  padding: 10,
  margin: `15px auto`,
  width: `150px`,
  background: isDragging ? "#B0766A" : "white",
  color: isDragging ? "white" : "black",
  fontsize: `20px`,
  border: `1px solid black`,
  borderRadius: `5px`,

  ...draggableStyle,
});

const TrelloListC = () => {
  const [todo1, setTodo1] = useState(listContents1);
  const [todo2, setTodo2] = useState(listContents2);

  const onDragEnd1 = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;

    const contents1 = Array.from(todo1); //creating a shallow array copy

    const [newOrder] = contents1.splice(source.index, 1); //taking an item out of an array
    contents1.splice(destination.index, 0, newOrder); //passing our newOrder variable we created in the destination

    setTodo1(contents1);
  };
  const onDragEnd2 = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;

    const contents2 = Array.from(todo2); //creating a shallow array copy

    const [newOrder] = contents2.splice(source.index, 1); //taking an item out of an array
    contents2.splice(destination.index, 0, newOrder); //passing our newOrder variable we created in the destination

    setTodo2(contents2);
  };
  return (
    <div>
      <h2>Trello Drag n Drop First Version</h2>
      <p>
        Here I used React Beautiful Drag and Drop library to drag and drop
        tickets belonging to the same column
      </p>
      <div className="maincontainer">
        <DragDropContext onDragEnd={onDragEnd1}>
          <Droppable droppableId="todo1">
            {(
              provided //provided.innerref allows us to have access to the list element DOM node, abd provided.droppableprops allows the library to keep track of the movements and positioning
            ) => (
              <div
                className="todo"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {todo1.map(({ id, text }, index) => {
                  return (
                    <Draggable key={id} draggableId={id} index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={getItemStyle(
                            snapshot.isDragging,
                            provided.draggableProps.style
                          )}
                        >
                          {text}
                        </div>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        <DragDropContext onDragEnd={onDragEnd2}>
          <Droppable droppableId="todo1">
            {(
              provided //provided.innerref allows us to have access to the list element DOM node, abd provided.droppableprops allows the library to keep track of the movements and positioning
            ) => (
              <div className="maincontainer">
                <div
                  className="todo"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {todo2.map(({ id, text }, index) => {
                    return (
                      <Draggable key={id} draggableId={id} index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={getItemStyle(
                              snapshot.isDragging,
                              provided.draggableProps.style
                            )}
                          >
                            {text}
                          </div>
                        )}
                      </Draggable>
                    );
                  })}
                  {provided.placeholder}
                </div>
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
      {/* Commented for testing, code is working 
       <div style={styles.maincontainer}>
       <div style={styles.container}>
          <div>
            <h4>{title}</h4>
            <div style={styles.card}>
              <TrelloCard text={c2.text} />
            </div>
            <div style={styles.card}>
              <TrelloCard text={c2.text} />
            </div>
          </div>
        </div>
        <div style={styles.container}>
          <div>
            <h4>{title}</h4>
            <div style={styles.card}>
              <TrelloCard text={c2.text} />
            </div>
            <div style={styles.card}>
              <TrelloCard text={c2.text} />
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default TrelloListC;

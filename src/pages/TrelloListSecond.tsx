import { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import _ from "lodash"; //used to map objects
import { v4 } from "uuid"; //used to create a unique id

//CSS
import "./TrelloListSecond.css";

const item = {
  id: v4(),
  name: "Finish the task",
};
const item2 = {
  id: v4(),
  name: "Finish another task",
};
const TrelloList2 = () => {
  const [list, setlist] = useState<any>({
    "In-progress": {
      title: "In-progress",
      items: [item, item2],
    },
    Done: {
      title: "Done",
      items: [],
    },
  });

  const handleDragEnd = ({ destination, source }: any) => {
    console.log("from", source);
    console.log("to", destination);
    if (!destination) {
      console.log("not dropped in droppable");
      return;
    }
    if (
      destination.index === source.index &&
      destination.droppableId === source.droppableId
    ) {
      console.log("dropped in same place");
      return;
    }
    //Creating a copy of item before removing it from state
    const itemCopy = { ...list[source.droppableId].items[source.index] };
    setlist((prev: any) => {
      prev = { ...prev };
      //Remove from previous items array
      prev[source.droppableId].items.splice(source.index, 1);

      //Adding to new items array location
      prev[destination.droppableId].items.splice(
        destination.index,
        0,
        itemCopy
      );

      return prev;
    });
  };
  return (
    <>
      <h2>Trello Drag n Drop Second Version</h2>
      <p>
        Here I used React Beautiful Drag and Drop library to drag and drop
        tickets belonging to the different columns
      </p>
      <div className="Trello-app">
        <br />
        <DragDropContext onDragEnd={handleDragEnd}>
          {_.map(list, (data, key: any) => {
            return (
              <>
                <div key={key} className={"column"}>
                  <div className="flex-around">
                    <input className="input-bg" value={data.title} />
                  </div>
                  <Droppable droppableId={key}>
                    {(provided) => {
                      return (
                        <div
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                          className={"droppable-col"}
                        >
                          {data.items.map((el: any, index: any) => {
                            return (
                              <Draggable
                                key={el.id}
                                index={index}
                                draggableId={el.id}
                              >
                                {(provided) => {
                                  return (
                                    <div
                                      className={"item"}
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                    >
                                      {el.name}
                                    </div>
                                  );
                                }}
                              </Draggable>
                            );
                          })}
                          {provided.placeholder}
                        </div>
                      );
                    }}
                  </Droppable>
                </div>
              </>
            );
          })}
        </DragDropContext>
      </div>
    </>
  );
};

export default TrelloList2;

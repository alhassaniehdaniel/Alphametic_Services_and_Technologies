import { ReactComponent as ThreeDots } from "../assets/three-dots.svg";

const Box = (props: any) => {
  const boxes = props.boxes;
  return (
    <div className="box-display">
      <div className="box-preview" key={props.id}>
        <div className="title">
          <h2 className="box-title">{props.title}</h2>
          <h3 className="box-date">{props.date}</h3>
          <div className="Three-Dots">
            <ThreeDots></ThreeDots>
          </div>
        </div>
        <div className="title-content">
          <div className="icon">
            <img className="icon-svg" key={props.id} src={props.icon} />
          </div>
          <div className="content">
            <h2>{props.content}</h2>
            <div className="inner-content">
              <div
                className={
                  props.content_details === "increase"
                    ? "content_percentage green"
                    : "content_percentage red"
                }
              >
                <h5>{props.content_percentage}</h5>
              </div>
              <div className="content_details">{props.content_details}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Box;

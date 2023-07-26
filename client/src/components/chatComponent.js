import "../chats.css";
const UserChatComponent = () => {
  return (
    <>
      <input type="checkbox" id="check" />
      <label className="chat-btn" htmlFor="check">
        <i className="bi bi-chat-right-text comment"></i>
        <span className="position-absolute top-0 start-10 translate-middle badge border border-light rounded-circle bg-danger p-2">
          <span className="visually-hidden">unread messages</span>
        </span>
        <i className="bi bi-x-circle close"></i>
      </label>
      <div className="chat-wrapper">
        <div className="chat-header">
          <h6>Chat Room</h6>
        </div>
        <div className="chat-form">
          <div className="cht-msg">
            {Array.from({ length: 10 }).map((_, id) => (
              <div key={id}>
                <p>
                  <b>You wrote:</b> <i className="bi bi-emoji-expressionless"></i>
                </p>
                <p className="bg-primary p-3 ms-4 text-light rounded-pill">
                  <b>Other wrote: </b> <i className="bi bi-emoji-smile"></i>
                </p>
              </div>
            ))}
          </div>
          <div className="textarea-container">
            <textarea
              id="clientChatMsg"
              className="form-control"
              placeholder="Your Text Message"
            ></textarea>
            <button className="btn btn-primary inside-textarea-btn">
              <i className="bi bi-send"></i>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserChatComponent;

function Menu({ onRouteChange }) {
  return (
    <div className="wrapper">
      <div>
        <input type="button" onClick={onRouteChange} value="start game" />
      </div>
    </div>
  );
}

export default Menu;

function Menu({ onRouteChange }) {
  return (
    <div>
      <div>
        <input type="button" onClick={onRouteChange} value="start game" />
      </div>
    </div>
  );
}

export default Menu;

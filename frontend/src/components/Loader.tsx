import "../assets/style/spinner.css";

export default function Loader() {
  return (
    <div>
      <div className="spinner-container">
        <div className="loading-spinner"></div>
      </div>

      <div className="alert alert-warning" role="alert">
        You might experience a little delay during first attempt. Please Wait a
        Moment as we log you in
      </div>
    </div>
  );
}
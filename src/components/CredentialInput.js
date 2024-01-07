export default function CredentialInput({ label, required, onChange }) {
  let disclaimer = <div></div>;
  if (required) {
    disclaimer = <abbr className="required-disclaimer">*</abbr>;
  }
  return (
    <div className="signin-input">
      <label>
        {label}
        {disclaimer}
      </label>
      <input
        className="signin-textbox"
        type={label.toLowerCase() === "password" ? "password" : "text"}
        onChange={(event) => {
          onChange(event.target.value);
        }}
      ></input>
    </div>
  );
}

import { FormEvent, useRef, useState } from "react";
import classes from "./newsletter-registration.module.css";

function NewsletterRegistration() {
  const [signUpMessage, setSignUpMessage] = useState<string>();
  const emailInputRef = useRef<HTMLInputElement>(null);

  function registrationHandler(event: FormEvent) {
    event.preventDefault();

    const email = emailInputRef.current?.value;

    fetch("api/newsletters", {
      method: "POST",
      body: JSON.stringify({ email }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => setSignUpMessage(data.message))
      .catch(() => setSignUpMessage("Invalid email"));
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type="email"
            id="email"
            placeholder="Your email"
            aria-label="Your email"
            ref={emailInputRef}
          />
          <button onClick={registrationHandler}>Register</button>
        </div>

        {signUpMessage && <p>{signUpMessage}</p>}
      </form>
    </section>
  );
}

export default NewsletterRegistration;

import { useActionState } from 'react';
import { isEmail, isNotEmpty, isEqualToOtherValue, hasMinLength } from '../util/validation.js';

export default function Signup() {
  /**
   * If we use signupAction in useActionState, we need 2 parameters.
   * 
   * @param {*} prevFormState 
   * @param {*} formData 
   * @returns 
   */
  function signupAction(prevFormState, formData) {
    const email = formData.get('email');
    const password = formData.get('password');
    const confirmPassword = formData.get('confirm-password');
    const firstName = formData.get('first-name');
    const lastName = formData.get('last-mame');
    const role = formData.get('role');
    const terms = formData.get('terms');
    const acquisitionChannel = formData.getAll('acquisition'); // gets an array of multiple values

    let errors = [];

    if (!isEmail(email)) {
      errors.push('Invalid email address.');
    }

    if (!isNotEmpty(password) || !hasMinLength(password, 6)) {
      errors.push('You must provide a password with at least 6 characters.');
    }

    if (!isEqualToOtherValue(password, confirmPassword)) {
      errors.push('Passwords do not match.');
    }

    if (!isNotEmpty(firstName) || !isNotEmpty(lastName)) {
      errors.push('Please provide both your first and last name.');
    }

    if (!isNotEmpty(role)) {
      errors.push('Please select a role.');
    }

    if (!terms) {
      errors.push('You must agree to the terms and conditions.')
    }

    if (acquisitionChannel.length === 0) {
      errors.push('Please select at least one acquisition channel.');
    }

    if (errors.length > 0) {
      // we can return anything
      return { errors };
    }

    return { errors: null };
  }

  /**
   * We call it prefferably after signupAction, because it needs it as an argument.
   * Secord argument is the initial state value (signupAction may have never executed if no submit is done).
   * 
   * Destructured useActionState return values:
   *  formData -> return values from signupAction.
   *  formAction -> enhanced action by React. Should be set as value to form action attribute.
   *  pending -> returns true or false depending if form is submitted or not.
   */
  const [formState, formAction, pending] = useActionState(signupAction, { errors: null });

  return (
    /**
     * action is a standard attribute in HTML.
     * AVAILABLE AFTER REACT 19.
     * In React it overrides the default action and we do not need to call event.preventDefault().
     * We automatically get the formData object (don't forget the 'name' attribute).
     * React also automatically resets fields when action is called.
     */
    <form action={formAction}>
      <h2>Welcome on board!</h2>
      <p>We just need a little bit of data from you to get you started 🚀</p>

      <div className="control">
        <label htmlFor="email">Email</label>
        <input id="email" type="email" name="email" />
      </div>

      <div className="control-row">
        <div className="control">
          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password" />
        </div>

        <div className="control">
          <label htmlFor="confirm-password">Confirm Password</label>
          <input
            id="confirm-password"
            type="password"
            name="confirm-password"
          />
        </div>
      </div>

      <hr />

      <div className="control-row">
        <div className="control">
          <label htmlFor="first-name">First Name</label>
          <input type="text" id="first-name" name="first-name" />
        </div>

        <div className="control">
          <label htmlFor="last-name">Last Name</label>
          <input type="text" id="last-name" name="last-name" />
        </div>
      </div>

      <div className="control">
        <label htmlFor="phone">What best describes your role?</label>
        <select id="role" name="role">
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
          <option value="employee">Employee</option>
          <option value="founder">Founder</option>
          <option value="other">Other</option>
        </select>
      </div>

      <fieldset>
        <legend>How did you find us?</legend>
        <div className="control">
          <input
            type="checkbox"
            id="google"
            name="acquisition"
            value="google"
          />
          <label htmlFor="google">Google</label>
        </div>

        <div className="control">
          <input
            type="checkbox"
            id="friend"
            name="acquisition"
            value="friend"
          />
          <label htmlFor="friend">Referred by friend</label>
        </div>

        <div className="control">
          <input type="checkbox" id="other" name="acquisition" value="other" />
          <label htmlFor="other">Other</label>
        </div>
      </fieldset>

      <div className="control">
        <label htmlFor="terms-and-conditions">
          <input type="checkbox" id="terms-and-conditions" name="terms" />I
          agree to the terms and conditions
        </label>
      </div>

      {formState.errors && (
        <ul className="error">
          {formState.errors.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      )}

      <p className="form-actions">
        <button type="reset" className="button button-flat">
          Reset
        </button>
        <button className="button">Sign up</button>
      </p>
    </form>
  );
}

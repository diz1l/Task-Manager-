import styles from "./ErrorPage.module.scss";

export function ErrorPage() {
  const reloadPage = () => {
    window.location.reload();
  };

  return (
    <div className={styles.errorPage}>
      <div className={styles.card}>
        <div className={styles.icon}>!</div>
        <h1 className={styles.title}>Something went wrong.</h1>
        <p className={styles.message}>
          We're sorry, but something went wrong. Please try again later.
        </p>
        <button className={styles.button} type="button" onClick={reloadPage}>
          Go to main page
        </button>
      </div>
    </div>
  );
}

export default ErrorPage;

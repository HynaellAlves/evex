import styles from "./title.module.css";

type formProps = {
  title?: string
}

export default function Title(props: formProps) {
  return (
    <div>
      <h1 className={styles.title}>
        LOGIN
      </h1>
    </div>
  );
}
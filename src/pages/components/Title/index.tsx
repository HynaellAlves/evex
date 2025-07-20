import styles from "./title.module.css";

type titleProps = {
  title: string;
  class?: string;
  fontFamily: string;
  fontWeight: number;
}

export default function Title(props: titleProps) {
  return (
    <div className={`${styles.title} ${props.class? props.class : ''}`}>
      <h1 style={{ fontFamily: props.fontFamily, fontWeight: props.fontWeight }}>
        {props.title}
      </h1>
    </div>
  );
}
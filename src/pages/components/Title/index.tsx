import styles from "./title.module.css";

type titleProps = {
  title: string;
  class?: string;
  fontSize?: string;
  fontFamily: string;
  fontWeight: number;
  uppercase?: true | false;
}

export default function Title(props: titleProps) {
  return (
    <div className={`${styles.title} ${props.class ? props.class : ''}`}>
      <h1 style={{textTransform: props.uppercase? "uppercase" : "none" ,fontSize: props.fontSize, fontFamily: props.fontFamily, fontWeight: props.fontWeight }}>
        {props.title}
      </h1>
    </div>
  );
}
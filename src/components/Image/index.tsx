import Img from "next/image";

type imageProps = {
    src: string;
    href?: string;
    alt?: string;
    width: number;
    height: number;
    class: string;
}

export default function Image(props: imageProps) {
    return (
        <div style={{ maxHeight: props.height, maxWidth: props.width }} className={props.class}>
            <a href={props.href}><Img style={{ maxHeight: props.height }} src={props.src || '/img_empty.png'} alt={props.alt || "Image"} width={props.width} height={props.height} /></a>
        </div>
    );
}
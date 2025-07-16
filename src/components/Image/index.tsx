import Img from "next/image";

type imageProps = {
    id?: string;
    src: string;
    href?: string;
    alt?: string;
    width: number;
    height: number;
    class: string;
}

export default function Image(props: imageProps) {
    return (
        <div id={props.id} style={{ maxHeight: props.height, maxWidth: props.width, width: props.width, height: props.height }} className={props.class}>
            <a href={props.href}><Img style={{ maxHeight: '100%', maxWidth: '100%' }} src={props.src || '/img_empty.png'} alt={props.alt || "Image"} width={props.width} height={props.height} /></a>
        </div>
        // <div id={props.id} style={{ maxHeight: props.height, maxWidth: props.width, width: props.width, height: props.height}} className={props.class}>
        //     <a href={props.href}><img style={{ maxHeight: '100%', maxWidth: '100%', width: '100%', height: '100%' }} src={props.src || '/img_empty.png'} alt={props.alt || "Image"}/></a>
        // </div>

    );
}
import Image_logo from "next/image";
{/*  falta pegar a imagem, esperando design */}
type image = {
    src: string;
    alt?: string;
    width?: number;
    height?: number;
    className?: string;
}

export default function Image(props: image) {
    return (
        <div id = {props.src} className={props.className}>
            <Image_logo style={{ width: props.width, height: props.height }} src={props.src} alt={props.alt || "Image"} width={props.width} height={props.height} />
        </div>
    );
}
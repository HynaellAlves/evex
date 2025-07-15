import Img from "next/image";
{/*  falta pegar a imagem, esperando design */}
type imageProps = {
    id: string
    src: string;
    alt?: string;
    width?: number;
    height?: number;
    className?: string;
}

export default function Image(props: imageProps) {
    return (
        <div id = {props.id} className={props.className}>
            {/*  No src colocar a regra de se o caminho estiver */}
            <Img style={{ maxWidth: props.width, maxHeight: props.height }} src={props.src || '/img_empty'} alt={props.alt || "Image"} width={props.width} height={props.height} />
        </div>
    );
}
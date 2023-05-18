export interface IconBannerProps {
  img: string;
  content: string;
}
export function IconBanner({ img, content }: IconBannerProps) {
  return (
    <div className="flex items-center whitespace-nowrap ">
      <img src={img} className="pr-3" />
      <p className="font-normal ">{content}</p>
    </div>
  );
}

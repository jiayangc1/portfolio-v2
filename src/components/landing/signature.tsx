import { site } from "@/lib/site";

const signatureMask = {
  maskImage: "url(/signature.png)",
  WebkitMaskImage: "url(/signature.png)",
  maskSize: "contain",
  WebkitMaskSize: "contain",
  maskRepeat: "no-repeat",
  WebkitMaskRepeat: "no-repeat",
  maskPosition: "center",
  WebkitMaskPosition: "center",
};

export const Signature = () => {
  return (
    <div
      role="img"
      aria-label={`${site.name.full}'s signature`}
      className="mx-auto my-16 aspect-242/65 w-44 select-none bg-foreground/20"
      style={signatureMask}
    />
  );
};

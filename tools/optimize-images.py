#!/usr/bin/env python3
"""Optimize copies of local images in Hexo's generated public directory."""
from io import BytesIO
from pathlib import Path

from PIL import Image, PngImagePlugin

SOURCE = Path("source")
PUBLIC = Path("public")


def optimize(source: Path) -> tuple[int, int]:
    target = PUBLIC / source.relative_to(SOURCE)
    if not target.is_file() or target.is_symlink():
        return 0, 0
    original = target.read_bytes()
    with Image.open(BytesIO(original)) as image:
        # Animated PNGs and unusual image modes are left intact.
        if getattr(image, "n_frames", 1) != 1:
            return 0, 0
        options = {key: image.info[key] for key in ("icc_profile", "exif", "dpi") if key in image.info}
        output = BytesIO()
        if image.format == "JPEG" and image.mode in ("RGB", "L"):
            image.save(output, format="JPEG", quality=88, optimize=True, subsampling=0, **options)
        elif image.format == "PNG" and image.mode in ("1", "L", "LA", "P", "RGB", "RGBA"):
            info = PngImagePlugin.PngInfo()
            for key, value in image.text.items():
                info.add_text(key, value)
            if "transparency" in image.info:
                options["transparency"] = image.info["transparency"]
            image.save(output, format="PNG", optimize=True, pnginfo=info, **options)
        else:
            return 0, 0
    optimized = output.getvalue()
    if len(optimized) >= len(original):
        return 0, 0
    target.write_bytes(optimized)
    return 1, len(original) - len(optimized)


def main() -> None:
    if not PUBLIC.is_dir():
        raise SystemExit("Generate the site before optimizing images (public/ is missing).")
    count = saved = 0
    for source in SOURCE.rglob("*"):
        if source.is_file() and not source.is_symlink() and source.suffix.lower() in {".jpg", ".jpeg", ".png"}:
            try:
                changed, reduction = optimize(source)
                count += changed
                saved += reduction
            except (OSError, ValueError) as error:
                print(f"Skipping {source}: {error}")
    print(f"Optimized {count} generated images; saved {saved / 1024:.0f} KiB. Source files were not changed.")


if __name__ == "__main__":
    main()

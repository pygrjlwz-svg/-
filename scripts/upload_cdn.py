#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
上传网站媒体到国内对象存储（阿里云 OSS / 腾讯云 COS / 七牛 Kodo）
用法示例：
  # 阿里云 OSS
  python scripts/upload_cdn.py --provider aliyun \
      --access-key-id LTAIxxx --access-key-secret xxx \
      --bucket my-bucket --endpoint oss-cn-hangzhou.aliyuncs.com \
      --prefix portfolio --base-url https://cdn.example.com/portfolio

  # 腾讯云 COS
  python scripts/upload_cdn.py --provider tencent \
      --access-key-id AKIDxxx --access-key-secret xxx \
      --bucket my-bucket-1250000000 --region ap-shanghai \
      --prefix portfolio --base-url https://cdn.example.com/portfolio

  # 七牛
  python scripts/upload_cdn.py --provider qiniu \
      --access-key-id xxx --access-key-secret xxx \
      --bucket my-bucket --prefix portfolio \
      --base-url https://cdn.example.com/portfolio

上传完成后，把 --base-url 的值填入 src/data/media.js 的 MEDIA_BASE 即可全站切换。
"""
import argparse
import mimetypes
import os
import sys

CONTENT_TYPES = {
    ".mp4": "video/mp4",
    ".webp": "image/webp",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".svg": "image/svg+xml",
}
CACHE = "public, max-age=31536000, immutable"
DIRS = ["videos", "media", "ip", "covers"]


def collect_files(public_dir):
    items = []
    for d in DIRS:
        root = os.path.join(public_dir, d)
        if not os.path.isdir(root):
            continue
        for dirpath, _, names in os.walk(root):
            for name in names:
                full = os.path.join(dirpath, name)
                rel = os.path.relpath(full, public_dir).replace("\\", "/")
                items.append((rel, full))
    # 单文件
    for name in ("avatar.webp", "logo.png", "favicon.svg"):
        full = os.path.join(public_dir, name)
        if os.path.exists(full):
            items.append((name, full))
    return items


def content_type(rel):
    ext = os.path.splitext(rel)[1].lower()
    return CONTENT_TYPES.get(ext, "application/octet-stream")


def key_for(rel, prefix):
    return f"{prefix}/{rel}" if prefix else rel


def upload_aliyun(args, files):
    import oss2
    auth = oss2.Auth(args.access_key_id, args.access_key_secret)
    bucket = oss2.Bucket(auth, args.endpoint, args.bucket)
    for rel, full in files:
        key = key_for(rel, args.prefix)
        bucket.put_object_from_file(
            key, full,
            headers={"Content-Type": content_type(rel), "Cache-Control": CACHE},
        )
        print("uploaded", key, flush=True)


def upload_tencent(args, files):
    from qcloud_cos import CosConfig, CosS3Client
    config = CosConfig(Region=args.region, SecretId=args.access_key_id, SecretKey=args.access_key_secret)
    client = CosS3Client(config)
    for rel, full in files:
        key = key_for(rel, args.prefix)
        with open(full, "rb") as f:
            client.put_object(
                Bucket=args.bucket, Key=key, Body=f,
                ContentType=content_type(rel), CacheControl=CACHE,
            )
        print("uploaded", key, flush=True)


def upload_qiniu(args, files):
    from qiniu import Auth, put_file
    q = Auth(args.access_key_id, args.access_key_secret)
    token = q.upload_token(args.bucket)
    for rel, full in files:
        key = key_for(rel, args.prefix)
        ret, info = put_file(token, key, full)
        if not ret:
            print("FAILED", key, info, flush=True)
            sys.exit(1)
        print("uploaded", key, flush=True)


def main():
    ap = argparse.ArgumentParser(description="Upload site media to domestic object storage")
    ap.add_argument("--provider", required=True, choices=["aliyun", "tencent", "qiniu"])
    ap.add_argument("--access-key-id", required=True)
    ap.add_argument("--access-key-secret", required=True)
    ap.add_argument("--bucket", required=True)
    ap.add_argument("--prefix", default="portfolio", help="对象存储中的目录前缀")
    ap.add_argument("--base-url", required=True, help="CDN 访问域名+前缀，如 https://cdn.example.com/portfolio")
    ap.add_argument("--endpoint", default=None, help="阿里云 OSS endpoint，如 oss-cn-hangzhou.aliyuncs.com")
    ap.add_argument("--region", default=None, help="腾讯云 COS region，如 ap-shanghai")
    ap.add_argument("--public-dir", default=os.path.join(os.path.dirname(__file__), "..", "public"))
    args = ap.parse_args()

    public_dir = os.path.abspath(args.public_dir)
    files = collect_files(public_dir)
    if not files:
        print("No media files found under", public_dir)
        sys.exit(1)
    print(f"Found {len(files)} files")

    if args.provider == "aliyun":
        upload_aliyun(args, files)
    elif args.provider == "tencent":
        upload_tencent(args, files)
    else:
        upload_qiniu(args, files)

    print("\n完成！请把 MEDIA_BASE 设置为：", args.base_url)
    print("（修改 src/data/media.js 中的 MEDIA_BASE 常量，然后重新部署网站）")


if __name__ == "__main__":
    main()
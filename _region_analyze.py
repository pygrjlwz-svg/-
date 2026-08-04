# -*- coding: utf-8 -*-
import sys
sys.path.insert(0, r"C:\Users\Administrator\.cache\codex-runtimes\codex-primary-runtime\dependencies\python")
from PIL import Image

path = r"C:\Users\Administrator\.codex\visualizations\2026\08\04\019fccf9-a208-72d0-b1f2-5cdc49cbec4c\23-region-context.png"
im = Image.open(path).convert("RGB")
print("full size:", im.size)
# 选区：x 442-852, y 6206-6271（全页截图缩放可能不同，按比例裁剪附近区域）
scale_x = im.size[0] / 1294
scale_y = im.size[1] / 6580  # 页高需要探测，先用滚动高度估算
# 先看页高
# 直接从左上角开始找：全页截图高度 = 页面完整高度
H = im.size[1]
print("full height:", H)

# 目标区域：相对页面 y=6206..6271；用 1294 宽反推比例
# 视口宽 1294，截图宽 = 1294 * dpr (dpr=1)
x0 = int(442 * scale_x); x1 = int(852 * scale_x)
# y 按比例：如果截图高度对应 scrollHeight（约 6580+），取相对
y0 = int(6206 * scale_y); y1 = int(6271 * scale_y)
crop = im.crop((max(0,x0), max(0,y0), min(im.size[0],x1), min(im.size[1],y1)))
crop.save(r"C:\Users\Administrator\.codex\visualizations\2026\08\04\019fccf9-a208-72d0-b1f2-5cdc49cbec4c\24-region-crop.png")
print("crop size:", crop.size)

# ASCII 渲染裁剪区域（放大 2 倍像素）
cols, rows = 100, 40
small = crop.resize((cols, rows))
px = list(small.getdata())
chars = " .:-=+*#%@"
def lum(c): return 0.299*c[0]+0.587*c[1]+0.114*c[2]
for y in range(rows):
    line = "".join(chars[min(9, int(lum(px[y*cols+x])/255*10))] for x in range(cols))
    print(line)

---
sidebar_position: 2
---

1.图像标注软件准备

图像标注时数据集准备的关键一环，标注软件的选择决定了标注的效率；

常用的标注软件如下：

https://github.com/CVHub520/X-AnyLabeling.git

https://github.com/wkentaro/labelme.git

本文将以X-AnyLabeling为参考

下载可执行程序

X-AnyLabeling：

​	win：https://github.com/CVHub520/X-AnyLabeling/releases/download/v4.0.4/X-AnyLabeling-v4.0.4-CPU.exe

​	linux：https://github.com/CVHub520/X-AnyLabeling/releases/download/v4.0.4/X-AnyLabeling-v4.0.4-Linux-CPU

labelme：

​	pip install labelme

2. 标注示例

打开软件

![image-20260827093959659](/img/docs/image-20260827093959659.png)

左上角选择  文件->打开文件夹（浏览采集好的数据集图像路径“images”）

左上角选择  文件->更改输出目录（浏览标注信息保存的路径“images”）

左侧栏可选择矩形或者多边形进行标注

一般常用矩形【目标检测】

多边形【实例分割】

标注完成后，选择顶部菜单栏中 工具->统计总览->(在弹出的窗口右下角选择导出)

导出结果为export_data.zip 压缩文件，其中有classes.txt是我们的标签文件，提取标签文件到文件夹，回到软件；

在软件顶部菜单栏选择导出，根据所需要的数据集类型选择

YOLO-HBB 为目标检测

YOLO-SEG为实例分割

选择后浏览刚才导出的classes.txt标签文件

![image-20260827110127465](/img/docs/image-20260827110127465.png)

根据提示选择目标路径，可选择同步保存图像和跳过空标签 

# 数据集标注（COCO / YOLO 格式）

> 本篇是 **Ultralytics YOLO 系列教程**的第 2 篇，承接「环境搭建」，为后续的模型训练准备好一份**格式正确、类别一致、划分合理**的数据集。

图像标注是数据集准备的关键一环，**标注质量直接决定模型上限**，而标注软件的选择则决定了标注效率。本文以 [X-AnyLabeling](https://github.com/CVHub520/X-AnyLabeling) 为主线，演示从「原始图片」到「YOLO/COCO 格式标注文件」的完整流程，并补充 labelme 等备选方案。

---

## 1. 标注前的准备

### 1.1 数据集采集建议

在进入标注软件之前，先按目标任务的规模准备图像。Ultralytics 官方与社区实践给出的经验值如下[citation:5]：

| 类别数量  | 单类别图片数 | 总图片数  | 备注                            |
| --------- | ------------ | --------- | ------------------------------- |
| 1–5 类    | ≥ 200 张     | ≥ 500 张  | 覆盖不同角度、光照、背景        |
| 6–20 类   | ≥ 100 张     | ≥ 1000 张 | 复杂场景（遮挡/模糊）占比 ≥ 30% |
| 20 类以上 | ≥ 50 张      | ≥ 2000 张 | 建议配合数据增强补充            |

**图像规范**[citation:5]：

- **格式**：优先 JPG（体积小），也可用 PNG。
- **尺寸**：尽量统一分辨率（如 640×640、1280×720），避免极端长宽比（如 10:1）。
- **质量**：无严重模糊、过曝/过暗；目标占画面比例 ≥ 5%，避免小目标过多。

:::tip 建议的目录组织方式

在标注开始前，先把采集好的图像放到一个 `images/` 目录中，例如：

```
my_dataset/
└── images/          ← 所有待标注的原始图像
    ├── img_0001.jpg
    ├── img_0002.jpg
    └── ...
```

标注产生的标签文件将以此为基准组织。

:::

---

### 1.2 标注软件选型

| 工具                                           | 优势                                                         | 操作难度 | 适用场景                          |
| ---------------------------------------------- | ------------------------------------------------------------ | -------- | --------------------------------- |
| **X-AnyLabeling**（推荐）                      | 内置 AI 推理引擎、支持 SAM 等模型辅助标注；一键导出 YOLO/COCO/VOC/DOTA 等 15+ 格式[citation:6][citation:3] | 低–中    | 检测/分割/关键点/旋转框，效率最高 |
| [labelme](https://github.com/wkentaro/labelme) | 支持多边形标注，JSON 格式通用                                | 中       | 检测 + 分割混合任务               |
| LabelImg                                       | 轻量、免费、可直接存 YOLO 格式                               | 低       | 新手 / 小数据集（&lt;1000 张）       |
| CVAT / Label Studio                            | 支持多人协作、批量标注                                       | 中–高    | 大数据集（>1000 张）、团队协作    |

> 本文以 **X-AnyLabeling v4.0.4** 为参考。它支持**一键导入/导出** YOLOv5/v8/v11 等主流标签格式，是衔接「标注」与「Ultralytics 训练」最高效的工具[citation:9][citation:12]。

---

### 1.3 安装 X-AnyLabeling

=== "Windows"

    下载可执行程序（CPU 版）：
    
    ```
    https://github.com/CVHub520/X-AnyLabeling/releases/download/v4.0.4/X-AnyLabeling-v4.0.4-CPU.exe
    ```
    
    双击运行即可，无需安装 Python 环境。如需 GPU 加速推理辅助标注，请选择对应的 GPU 版本。

=== "Linux"

    下载可执行程序：
    
    ```
    https://github.com/CVHub520/X-AnyLabeling/releases/download/v4.0.4/X-AnyLabeling-v4.0.4-Linux-CPU
    ```
    
    赋予执行权限后运行：
    
    ```bash
    chmod +x X-AnyLabeling-v4.0.4-Linux-CPU
    ./X-AnyLabeling-v4.0.4-Linux-CPU
    ```

=== "Python 环境（labelme 备选）"

    ```bash
    pip install labelme
    labelme   # 启动图形界面
    ```
    
    labelme 以 JSON 格式存储多边形标注，可通过转换脚本进一步转成 YOLO/COCO 格式。

---

## 2. X-AnyLabeling 标注流程

### 2.1 打开文件夹并配置输出目录

1. 启动 X-AnyLabeling，点击左上角 **文件 → 打开文件夹**，选择采集好的数据集图像目录（如 `my_dataset/images`）。
2. 点击 **文件 → 更改输出目录**，选择标注信息保存路径（建议也指向 `images` 目录或专门的 `annotations` 目录）。

> 标注过程中，X-AnyLabeling 会以自定义 JSON 格式实时保存每张图的标注，无需手动逐张保存。

### 2.2 选择标注类型并开始标注

软件左侧栏可选择标注形状：

- **矩形框（Rectangle）** —— 用于 **目标检测（Detection）**，最常用。
- **多边形（Polygon）** —— 用于 **实例分割（Instance Segmentation）**。

根据任务在左侧栏选择对应工具，在图像上框选/描点目标，并为每个目标指定类别名称。

:::info 标注操作小技巧

- 标注第一个目标时，软件会提示你输入类别名（如 `person`、`car`），后续可从下拉类别列表中快速选择。
- 善用 **AI 辅助标注**（菜单栏/工具栏的模型推理按钮）：加载 YOLO/SAM 等预训练模型后可一键生成预标注，再人工微调，效率可提升 **8–10 倍**[citation:3]。
- 使用快捷键（如 `Ctrl+Z` 撤销、`Del` 删除当前标注）可显著加快速度。

:::

### 2.3 导出标签配置文件（classes.txt）

标注完成后，按以下步骤导出类别标签文件：

1. 顶部菜单栏选择 **工具 → 统计总览**。
2. 在弹出的窗口右下角点击 **导出**。
3. 导出结果为 `export_data.zip` 压缩文件，解压后可得到 **`classes.txt`**——这就是我们的标签（类别）文件。

`classes.txt` 的格式非常简洁：**每行一个类别，从 0 开始顺序编号**，例如：

```
person
car
bicycle
dog
```

> ⚠️ **务必保留此文件**：后续导出 YOLO/COCO 格式时都需要指定它，且类别顺序将决定训练时的 `class_id`，必须全程保持一致。

---

## 3. 导出为训练可用格式

回到 X-AnyLabeling 主界面，点击顶部菜单栏的 **导出**，根据任务选择导出格式[citation:6][citation:12]：

| 导出格式          | 适用任务                    | 所需输入      | 输出文件                         |
| ----------------- | --------------------------- | ------------- | -------------------------------- |
| **YOLO-HBB**      | 目标检测（Ultralytics）     | `classes.txt` | 每张图一个 `.txt`（归一化 bbox） |
| **YOLO-SEG**      | 实例分割                    | `classes.txt` | 每张图一个 `.txt`（多边形 mask） |
| YOLO-OBB          | 旋转目标检测                | `classes.txt` | 每张图一个 `.txt`（旋转 bbox）   |
| YOLO-Pose         | 关键点检测                  | `config.yaml` | 每张图一个 `.txt`（关键点）      |
| COCO（检测/分割） | Detectron2 / MMDetection 等 | `classes.txt` | 单个 `instances.json`            |
| Pascal VOC        | 传统检测框架                | 无            | 每张图一个 `.xml`                |

### 3.1 导出为 YOLO 格式（最常用）

1. 点击 **导出**，选择 **YOLO-HBB**（检测）或 **YOLO-SEG**（分割）。
2. 在弹出的对话框中**浏览并选择刚才导出的 `classes.txt`** 标签文件。
3. 选择目标输出路径（建议新建 `labels` 文件夹），可勾选：
   - **Save with images**（同步保存图像副本）——便于生成自包含的数据集。
   - **Skip empty labels**（跳过空标签）——减少无标注的空文件。
4. 点击 **确定**，软件会自动导出。

导出后典型目录结构如下[citation:12]：

```
my_dataset/
├── images/
│   ├── img_0001.jpg
│   └── img_0002.jpg
├── labels/                ← 导出的 YOLO 标签
│   ├── img_0001.txt
│   └── img_0002.txt
└── classes.txt
```

### 3.2 YOLO 标签文件格式说明

每个 `.txt` 文件与同名图像一一对应，**每行一个目标**[citation:2][citation:7]：

```
class_id x_center y_center width height
```

- 五个值以**空格**分隔；坐标均为**相对于图像尺寸归一化到 [0, 1]** 的浮点数。
- `class_id` 为 `classes.txt` 中的**从 0 开始的行号**。

**示例**（`img_0001.txt`，含 2 个目标）：

```
0 0.486000 0.631200 0.180000 0.415000
2 0.795000 0.540000 0.090000 0.130000
```

> 表示：类别 0（如 person）的大目标在左下方，类别 2（如 car）的小目标在右上方。

**坐标换算公式**[citation:2]：

```
x_center = (left + right) / 2 / image_width
y_center = (top  + bottom) / 2 / image_height
width    = (right - left) / image_width
height   = (bottom - top) / image_height
```

:::warning 最容易踩的坑：忘记归一化

如果把像素值直接写进标签（如 `0 487 312 180 415`），训练会**看似正常进行，但验证 mAP 始终为 0**，浪费大量时间。记住一条铁律：**只要坐标值大于 1，就一定是忘了归一化**[citation:2][citation:10]。

:::

对于 **YOLO-SEG（实例分割）**，每行格式为 `class_id x1 y1 x2 y2 ... xn yn`，即类别 ID 后跟多边形顶点归一化坐标[citation:6]。

### 3.3 导出为 COCO 格式（可选）

若你的训练框架是 Detectron2 / MMDetection，或需要与支持 COCO 的平台（CVAT、Label Studio 等）对接[citation:3]，可选择 **COCO（Rectangle / Polygon）** 导出，得到单个 `instances.json` 文件：

```json
{
  "images": [
    {"id": 1, "file_name": "img_0001.jpg", "width": 1280, "height": 720}
  ],
  "annotations": [
    {
      "id": 1, "image_id": 1, "category_id": 1,
      "bbox": [100, 150, 300, 200], "area": 60000,
      "segmentation": [[100,150,400,150,400,350,100,350]],
      "iscrowd": 0
    }
  ],
  "categories": [
    {"id": 1, "name": "car"}
  ]
}
```

> COCO 导出因可能耗时较长会使用多线程处理[citation:6]。COCO 的 `category_id` 默认从 1 开始，与 YOLO 的 0 起始 `class_id` 不同，转换时需注意偏移。

---

## 4. 组织成 Ultralytics 训练目录

Ultralytics YOLO 对数据集布局有明确要求[citation:2][citation:4]：

- 图像与标签分两个并列目录：`images/` 与 `labels/`。
- 各自内部按 `train/` 和 `val/`（可选 `test/`）划分。
- **图像与标签文件名必须一一对应**（仅扩展名不同）。

### 4.1 推荐目录结构

```
my_dataset/
├── data.yaml                ← 数据集配置文件（见 4.2）
├── train/
│   ├── images/
│   │   ├── img_0001.jpg
│   │   └── img_0002.jpg
│   └── labels/
│       ├── img_0001.txt
│       └── img_0002.txt
├── val/
│   ├── images/
│   │   └── img_0101.jpg
│   └── labels/
│       └── img_0101.txt
└── test/                    ← 可选
    ├── images/
    └── labels/
```

也可采用 `images/train/ + labels/train/` 的平铺形式（COCO8 示例布局）[citation:17]，两者 Ultralytics 均能识别。

### 4.2 编写 data.yaml

`data.yaml` 告诉 YOLO 去哪里找数据以及类别如何映射[citation:4][citation:7]：

```yaml
# 数据集根目录（建议使用绝对路径，避免路径问题）
path: /absolute/path/to/my_dataset

train: train/images   # 训练集图像（相对 path）
val:   val/images     # 验证集图像
test:  test/images    # 测试集（可选）

# 类别数
nc: 3

# 类别名（顺序必须与 classes.txt / 标签 class_id 一致，从 0 开始）
names:
  0: person
  1: car
  2: dog
```

> `train`/`val` 可接受「目录」「目录列表」或「每行一个图像路径的 `*.txt` 文件」三种形式[citation:17]。

### 4.3 划分训练/验证集

若标注导出后是混在一起的，可用以下脚本按比例拆分（如 8:2）：

```python
import os, random, shutil
from pathlib import Path

random.seed(42)
img_dir = Path("my_dataset/images")
lbl_dir = Path("my_dataset/labels")
out = Path("my_dataset")

imgs = sorted(img_dir.glob("*.jpg"))
random.shuffle(imgs)
split = int(len(imgs) * 0.8)
splits = {"train": imgs[:split], "val": imgs[split:]}

for sp, files in splits.items():
    for f in files:
        shutil.move(f, out / sp / "images" / f.name)
        lbl = lbl_dir / (f.stem + ".txt")
        if lbl.exists():
            shutil.move(lbl, out / sp / "labels" / lbl.name)
```

---

## 5. 格式校验与验证

### 5.1 校验清单

- [ ] 每个 `.txt` 标签每行恰好 5 个字段（检测）或 `1 + 偶数个` 坐标（分割）。
- [ ] 所有坐标值均在 **[0, 1]** 之间（归一化正确）。
- [ ] `class_id` 在 `[0, nc-1]` 范围内，且与 `data.yaml` 的 `names` 顺序一致。
- [ ] 图像与标签**文件名一一对应**，无多余/缺失。
- [ ] `data.yaml` 中 `path` 路径正确，`train`/`val` 可访问。

:::tip 用 Python 快速校验一个标签文件

```python
def check_yolo(txt_path):
    with open(txt_path) as f:
        for ln, line in enumerate(f, 1):
            p = line.strip().split()
            if len(p) != 5:
                print(f"{txt_path}:{ln} 字段数={len(p)}（应为 5）")
                continue
            cid, *vals = p
            vals = list(map(float, vals))
            if any(v > 1 for v in vals):
                print(f"{txt_path}:{ln} 存在 >1 的值，可能未归一化")
```

:::

### 5.2 一键训练验证

用准备好的数据集跑一个快速训练，验证数据管道是否通畅：

```python
from ultralytics import YOLO

model = YOLO("yolo11n.pt")          # 加载预训练模型（推荐）
results = model.train(
    data="my_dataset/data.yaml",
    epochs=100,
    imgsz=640,
    batch=16,
    name="my_detector_v1",
)
```

训练正常启动且首个 epoch 后验证指标不为 0，说明标注与目录结构均正确。最佳权重会保存在 `runs/detect/my_detector_v1/weights/best.pt`[citation:4]。

---

## 6. 常见问题（FAQ）

:::warning 训练正常进行，但 val mAP 始终为 0

**原因**：标签坐标未归一化（使用了像素值）。**解决**：确认所有坐标 ∈ [0,1]；用第 5.1 节的校验脚本排查。这是 YOLO 标注**最常见**的错误[citation:2][citation:10]。

:::

:::warning 图像被当作无标注（no annotations）

**原因**：图像与标签文件名不一致，或标签放在了错误目录。**解决**：Ultralytics 通过把图像路径中的 `images` 替换为 `labels`、扩展名改为 `.txt` 来定位标签[citation:2]。确保 `images/train/xxx.jpg` 对应 `labels/train/xxx.txt`。

:::

:::tip COCO 与 YOLO 的类别 ID 差 1

COCO 的 `category_id` 默认从 **1** 开始，而 YOLO 的 `class_id` 从 **0** 开始。在 COCO ↔ YOLO 互转时记得处理这个偏移[citation:12]。

:::

:::tip 需要把 COCO JSON 转成 YOLO txt

可使用官方转换思路或社区脚本（如 `JSON2YOLO`、Ultralytics 内置的 `ultralytics/datasets/coco2017.py` 转换脚本）批量转换[citation:2][citation:5]。

:::

---

## 7. 小结与下一步

本篇完成了：

1. 按任务规模采集并规范组织图像数据；
2. 使用 **X-AnyLabeling** 完成目标检测/实例分割标注；
3. 导出 **YOLO（HBB/SEG）** 或 **COCO** 格式标注文件；
4. 按 Ultralytics 规范组织 `images/` + `labels/` 目录并编写 `data.yaml`；
5. 对标签格式进行归一化、类别一致性校验。

> 至此，一份符合 Ultralytics YOLO 训练要求的数据集已经准备就绪。**下一篇**将基于此数据集，讲解模型训练的参数配置、训练过程监控与结果分析。

---

**参考资料**

- Ultralytics 官方文档 — [Prepare a Custom Dataset](https://academy.ultralytics.com/courses/train-your-first-yolo/prepare-a-dataset)[citation:2]、[目标检测数据集概述](https://docs.ultralytics.com/zh/datasets/detect)[citation:17]
- X-AnyLabeling 文档 — [Export Operations](https://deepwiki.com/CVHub520/X-AnyLabeling/6.3-export-operations)[citation:6]、[User Manual（Import/Export）](https://github.com/CVHub520/X-AnyLabeling)[citation:9]
- Roboflow — [YOLO Annotation Format](https://roboflow.com/formats/yolo)[citation:7]
- CSDN — [YOLO 实战训练之数据集准备](https://blog.csdn.net/weixin_44464662/article/details/156590960)[citation:5]

[citation:3]:

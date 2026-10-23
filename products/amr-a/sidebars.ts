import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  productSidebar: [
    {type: 'doc', id: 'intro', label: '产品概览'},
    {
      type: 'category',
      label: '快速开始',
      collapsed: false,
      link: {type: 'doc', id: 'quick-start'},
      items: [
        'quick-start/device-check-and-boot',
        'quick-start/connect-to-robot',
        'quick-start/basic-function-test',
        'quick-start/local-dev-debug',
      ],
    },
    {type: 'doc', id: 'specs', label: '规格参数'},
    {
      type: 'category',
      label: '硬件与结构',
      link: {
        type: 'generated-index',
        title: '硬件与结构',
        description: '整机拓扑、运动底盘、OMS 执行机构与传感器外设。',
        slug: '/hardware',
      },
      items: [
        'hardware/system-overview',
        'hardware/robot-overview',
        'hardware/motion-chassis',
        'hardware/oms-actuator',
        'hardware/sensor-peripherals',
      ],
    },
    {
      type: 'category',
      label: '参数配置与标定',
      link: {
        type: 'generated-index',
        title: '参数配置与标定',
        description: 'VMX-Pi、底盘运动学、OMS 电机、激光雷达、IMU、Wi-Fi 与路径驱动参数。',
        slug: '/device-params',
      },
      items: [
        'device-params/vmxpi-titan-params',
        'device-params/chassis-kinematics-params',
        'device-params/oms-motor-params',
        'device-params/lidar-driver-params',
        'device-params/imu-calibration',
        'device-params/wifi-params',
        'device-params/path-driver-kit-params',
      ],
    },
    {
      type: 'category',
      label: '控制与应用',
      link: {
        type: 'generated-index',
        title: '控制与应用',
        description: '从底盘速度控制、执行机构、传感器读取到视觉识别与综合任务。',
        slug: '/applications',
      },
      items: [
        {
          type: 'category',
          label: '底盘控制',
          items: [
            'applications/chassis-control/basic-velocity-control',
            'applications/chassis-control/straight-rotate-control',
            'applications/chassis-control/trajectory-control',
          ],
        },
        {
          type: 'category',
          label: '执行机构',
          items: [
            'applications/actuator-control/servo-control',
            'applications/actuator-control/lift-rotate-control',
            'applications/actuator-control/user-servo-params',
            'applications/actuator-control/user-lift-rotate-params',
          ],
        },
        {
          type: 'category',
          label: '传感器应用',
          items: [
            'applications/sensor-application/lidar-data-processing',
            'applications/sensor-application/imu-data-usage',
            'applications/sensor-application/ranging-sensors',
          ],
        },
        {
          type: 'category',
          label: '视觉应用',
          items: [
            'applications/vision-application/camera-capture',
            'applications/vision-application/object-detection-basics',
            'applications/vision-application/deep-learning-detection',
          ],
        },
        {
          type: 'category',
          label: '综合任务',
          items: [
            'applications/integration-tasks/multi-module-task',
            'applications/integration-tasks/visual-tracking-grasp',
          ],
        },
      ],
    },
    {type: 'doc', id: 'navigation', label: '导航与调参'},
    {type: 'doc', id: 'maintenance', label: '维护与安全'},
    {
      type: 'category',
      label: '激光雷达与系统',
      items: [
        {
          type: 'category',
          label: '激光雷达',
          items: [
            'advanced/lidar/lidar-sdk-install',
            'advanced/lidar/lidar-ros2-driver',
            'advanced/lidar/lidar-localization-navigation',
          ],
        },
        {
          type: 'category',
          label: '系统与通信',
          items: [
            'advanced/system/udev-rule',
            'advanced/system/ros2-dds-config',
          ],
        },
      ],
    },
    {type: 'doc', id: 'faq', label: '常见问题'},
  ],
};

export default sidebars;

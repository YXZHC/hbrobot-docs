import type {ReactNode} from 'react';
import Layout from '@theme/Layout';

import ToolCatalog from '@site/src/components/ToolCatalog';

export default function ToolsPage(): ReactNode {
  return (
    <Layout
      title="调试工具"
      description="汇博机器人调试工具独立栏目：底盘参数配置、运动标定、地图编辑与导航调试工具的下载入口。">
      <main className="container margin-vert--lg">
        <ToolCatalog />
      </main>
    </Layout>
  );
}

import { use as useHttp } from '../../../api/request';

interface List {
  themeId: string,
  themeName: string,
  holdTime: number,
  creator: string,
  participants: number,
}

export async function getTheme (): Promise<{
  success: boolean,
  message: string,
  data: List[]
}> {
  try {
    const response = await useHttp().get('/getAllTheme.php');

    // 在這裡處理 response 的數據格式，並組織成您希望的格式
    const formattedData = {
      success: true,
      message: '成功獲取主題列表',
      data: response.data,
    };

    return formattedData;
  } catch (error) {
    // 處理錯誤情況
    const errorData = {
      success: false,
      message: '無法獲取主題列表',
      data: [],
    };

    return errorData;
  }
}
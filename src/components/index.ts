import type { App } from 'vue'
import SvgIcon from './SvgIcon/index.vue'
import MBack from './MBack/index.vue'
import MTitle from './MTitle/index.vue'
import MCeil from './MCeil/index.vue'
import MForm from './MForm/index.vue'
import MInput from './MInput/index.vue'
import MSelect from './MSelect/index.vue'
import MRadio from './MRadio/index.vue'
import MDate from './MDate/index.vue'
import MDatePickerGroup from './MDatePickerGroup/index.vue'
import MCalendar from './MCalendar/index.vue'
import MCheck from './MCheck/index.vue'
import MCheckPicker from './MCheckPicker/index.vue'
import MUpload from './MUpload/index.vue'
import MUploadFile from './MUpload/file.vue'
import MTree from './MTree/index.vue'
import MArea from './MArea/index.vue'
import MMap from './MMap/index.vue'
import MTable from './MTable/index.vue'
import MEchats from './MEchats/index.vue'
// 业务组件
import MSearch from './Business/MSearch/index.vue'
import MHotel from './Business/MHotel/index.vue'
import MPage from './Business/MPage/index.vue'
import MPerson from './Business/MPerson/index.vue'
import MPersonPop from './Business/MPersonPop/index.vue'
import OperatePop from './Business/OperatePop/index.vue'
import MScroll from './Business/MScroll/index.vue'
export const components = {
  SvgIcon,
  MBack,
  MTitle,
  MCeil,
  MForm,
  MInput,
  MSelect,
  MRadio,
  MDate,
  MDatePickerGroup,
  MCalendar,
  MCheck,
  MCheckPicker,
  MUpload,
  MUploadFile,
  MPersonPop,
  MSearch,
  MTree,
  MArea,
  MMap,
  MTable,
  MEchats,
  MHotel,
  MPage,
  MPerson,
  OperatePop,
  MScroll,
}

export function setupGlobalCom(app: App<Element>) {
  for (const key in components) {
    app.component(components[key].name, components[key])
  }
}

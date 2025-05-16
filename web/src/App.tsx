import { MantineProvider } from "@mantine/core";
import NotificationManager from "./components/notification/NotificationManager";
import { isEnvBrowser } from "./utils/misc";
import TextUIManager from "./components/textui/TextUIManager";
import ProgressManager from "./components/progress/ProgressManager";
import { ProgressProvider } from "./context/ProgressContext";
import BrowserTestMenu from "./components/dev/BrowserTestMenu";

const App = () => {
  return (
    <MantineProvider defaultColorScheme="dark">
      <ProgressProvider>
        <NotificationManager />
        <TextUIManager />
        <ProgressManager />
        {isEnvBrowser() && <BrowserTestMenu />}
      </ProgressProvider>
    </MantineProvider>
  );
};

export default App;

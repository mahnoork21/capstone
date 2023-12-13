import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { ContentBox, MainContainer, TabsSelectorBox } from "./styled";
import HowToUseContent from "./components/how-to-use-content";
import FAQsContent from "./components/faqs-content";

function CustomTabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <ContentBox>{children}</ContentBox>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function Help() {
  const [selectedTab, setSelectedTab] = React.useState(0);

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <MainContainer>
      <TabsSelectorBox borderBottom={1} borderColor="divider">
        <Tabs
          value={selectedTab}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="How to Use" {...a11yProps(0)} />
          <Tab label=" FAQs" {...a11yProps(1)} />
        </Tabs>
      </TabsSelectorBox>
      <CustomTabPanel value={selectedTab} index={0}>
        <HowToUseContent />
      </CustomTabPanel>
      <CustomTabPanel value={selectedTab} index={1}>
        <FAQsContent />
      </CustomTabPanel>
    </MainContainer>
  );
}

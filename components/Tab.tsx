import styled from "styled-components";

const Row = styled.div`
  display: flex;
  position: relative;
`;

const Button = styled.button<{ active: boolean }>`
  outline: none;
  height: 40px;
  cursor: pointer;
  border: unset;
  color: ${({ active }) => (active ? "red" : "black")};
  margin: .3rem;
`;

type Props = {
  tab: string;
  setTab: any;
  TABS: string[];
};
const Tabs = ({ tab, setTab, TABS }: Props) => {
  return (
    <Row>
      {TABS.map((name, i) => {
        const changeTab = () => {
          setTab(name);
        };

        return (
          <Button active={tab === name} key={i} onClick={changeTab}>
            {name.toUpperCase()}
          </Button>
        );
      })}
    </Row>
  );
};

export default Tabs;

import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import { useWeb3Modal } from "@web3modal/react";
import {
  useAccount,
  useDisconnect,
  useSwitchNetwork,
  useNetwork,
  useConnect,
} from "wagmi";
import { Drawer, List, ListItem } from "@material-tailwind/react";
import Container from "../components/containers/Container";
import TextButton from "../components/buttons/TextButton";
import TextIconButton from "../components/buttons/TextIconButton";
import FilledButton from "../components/buttons/FilledButton";
import { useBalance } from "wagmi";

import logoImg from "../assets/images/logo.png";

// -----------------------------------------------------------------------------------------

interface INavLink {
  id: number;
  label: string;
  iconName: string;
  to: string;
}

// -----------------------------------------------------------------------------------------
{
  /* <iconify-icon icon="simple-icons:binance"  style="color: #217372"></iconify-icon> */
}
const NAV_LINKS: Array<INavLink> = [
  {
    id: 2,
    label: "Twitter",
    iconName: "bi:twitter",
    to: "https://twitter.com",
  },
  {
    id: 3,
    label: "Telegram",
    iconName: "bi:telegram",
    to: "https://telegra,.com",
  },
  {
    id: 4,
    label: "Contract",
    iconName: "simple-icons:binance",
    to: "https://https://basescan.org/address/0x3ec70ec2c30790ee934ba6d22e7d3d76c79981be",
  },
];

const chainId = process.env.REACT_APP_CHAIN_ID;

// -----------------------------------------------------------------------------------------

export default function Navbar() {
  const { pathname } = useLocation();
  const { open } = useWeb3Modal();
  const { isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  const { connect } = useConnect();
  const { switchNetwork } = useSwitchNetwork();
  const { chain } = useNetwork();
  const navigate = useNavigate();
  // const { data, isError, isLoading } = useBalance({
  //   address: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
  // })

  const [visibleDrawer, setVisibleDrawer] = useState<boolean>(false);

  const closeDrawer = () => {
    setVisibleDrawer(false);
  };

  const navigateToPage = (to: string) => {
    navigate(to);
    closeDrawer();
  };

  return (
    <nav className="sticky top-0 bg-[#182b48] border-b border-gray-800 z-[99]">
      <Container className="justify-between p-3 hidden lg:flex">
        <div className="flex items-center gap-8">
          <Link to="/">
            <img src={logoImg} alt="logo" className="w-4 sm:w-10" />
          </Link>

          <div className="flex items-center gap-4">
            {NAV_LINKS.map((linkItem) => (
              <Link key={linkItem.id} to={linkItem.to}>
                <TextButton
                  className={`flex items-center gap-2 ${
                    pathname === linkItem.to ? "text-gray-100" : "text-gray-500"
                  }`}
                >
                  <Icon icon={linkItem.iconName} className="text-lg" />
                  {linkItem.label}
                </TextButton>
              </Link>
            ))}
          </div>
        </div>

        <div>{isConnected && <div></div>}</div>

        <div className="flex items-center gap-8">
          {isConnected ? (
            chain?.id === Number(chainId) ? (
              <FilledButton
                className="flex items-center gap-1"
                onClick={() => disconnect()}
              >
                <Icon icon="mdi:wallet-outline" className="text-xl" />
                Disconnect
              </FilledButton>
            ) : (
              <FilledButton
                className="flex items-center gap-1"
                onClick={() => switchNetwork?.(Number(chainId))}
              >
                <Icon icon="mdi:wallet-outline" className="text-xl" />
                Switch network
              </FilledButton>
            )
          ) : (
            <FilledButton
              className="flex items-center gap-1 bg-blue-500"
              onClick={() => open()}
            >
              <Icon icon="mdi:wallet-outline" className="text-xl" />
              Connect Wallet
            </FilledButton>
          )}
        </div>
      </Container>

      <Container className="justify-between items-center p-4 flex lg:hidden">
        <Link to="/">
          <img src={logoImg} alt="logo" className="w-8 sm:w-20" />
        </Link>

        <TextIconButton onClick={() => setVisibleDrawer(true)}>
          <Icon icon="ion:menu" className="text-xl" />
        </TextIconButton>
      </Container>
      <Drawer
        open={visibleDrawer}
        onClose={closeDrawer}
        className="p-4 bg-[#212121]"
      >
        <div className="flex flex-col gap-8">
          <div className="flex items-center justify-between">
            <Link to="/">
              <img src={logoImg} alt="logo" className="w-8" />
            </Link>

            <TextIconButton onClick={closeDrawer}>
              <Icon icon="akar-icons:cross" className="text-xl" />
            </TextIconButton>
          </div>

          <List>
            {NAV_LINKS.map((linkItem) => (
              <ListItem
                key={linkItem.id}
                onClick={() => navigateToPage(linkItem.to)}
                className={`gap-4 ${
                  pathname === linkItem.to ? "text-gray-100" : "text-gray-500"
                }`}
              >
                <Icon icon={linkItem.iconName} className="text-lg" />
                {linkItem.label}
              </ListItem>
            ))}
          </List>

          <List>
            {isConnected ? (
              chain?.id === Number(chainId) ? (
                <ListItem
                  className="gap-4 text-gray-100"
                  onClick={() => disconnect()}
                >
                  <Icon icon="mdi:wallet-outline" className="text-xl" />
                  Disconnect
                </ListItem>
              ) : (
                <ListItem
                  className="gap-4 text-gray-100"
                  onClick={() => switchNetwork?.(Number(chainId))}
                >
                  <Icon icon="mdi:wallet-outline" className="text-xl" />
                  Switch network
                </ListItem>
              )
            ) : (
              <ListItem className="gap-4 text-gray-100" onClick={() => open()}>
                <Icon icon="mdi:wallet-outline" className="text-xl" />
                Connect Wallet
              </ListItem>
            )}
          </List>
        </div>
      </Drawer>
    </nav>
  );
}

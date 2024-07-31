import { Layout, Menu } from "antd";
import Link from "next/link";

const { Header } = Layout;

const Navbar = () => {
  return (
    <Header>
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["home"]}>
        <Menu.Item key="home">
          <Link href="/">Get a Joke</Link>
        </Menu.Item>
        <Menu.Item key="submit">
          <Link href="/submitJoke">Submit Joke</Link>
        </Menu.Item>
        <Menu.Item key="moderate">
          <Link href="/moderateJokes">Moderate Jokes</Link>
        </Menu.Item>
      </Menu>
    </Header>
  );
};

export default Navbar;

import React, { useEffect } from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'
import { RiAiGenerate } from 'react-icons/ri'
import { LiaCampgroundSolid } from 'react-icons/lia'
import { SlDocs } from 'react-icons/sl'
import { IoSettingsOutline } from 'react-icons/io5'
import { NavLink } from 'react-router-dom'
const Menu = styled.ul`
  ${tw`h-20 text-xl font-medium p-5 pt-10 h-screen`}
`
const Tab = styled.div`
  ${tw`flex p-2`}
`

const SideBar = ({ activeMenu }) => {
  const menuItems = [
    {
      path: '/developer/api',
      name: 'API Keys',
      icon: <RiAiGenerate />,
    },
    {
      path: '/developer/playground',
      name: 'Playground',
      icon: <LiaCampgroundSolid />,
    },
    {
      path: '/developer/docs',
      name: 'Docs',
      icon: <SlDocs />,
    },
    {
      path: '/developer/settings',
      name: 'Settings',
      icon: <IoSettingsOutline />,
    },
  ]

  return (
    <Menu>
      {menuItems.map((item, index) => (
        <NavLink
          to={item.path}
          key={index}
          onClick={() => activeMenu(item.path)}
        >
          <Tab>
            {item.icon}
            {item.name}
          </Tab>
        </NavLink>
      ))}
    </Menu>
  )
}

export default SideBar

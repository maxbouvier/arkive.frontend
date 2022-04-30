import { dummyImages, icons } from "../assets";

export const CONST = {
  hitSlop: { top: 25, left: 25, bottom: 25, right: 25 },
};

const commonMemberArray = [
  {
    id: 1,
    name: "Max Statham",
    username: "username",
    isSelected: false
  },
  {
    id: 2,
    name: "First Last Name",
    username: "username",
    isSelected: false
  },
  {
    id: 4,
    name: "First Last Name",
    username: "username",
    isSelected: false
  },
  {
    id: 5,
    name: "First Last Name",
    username: "username",
    isSelected: false
  },
]

export const data = {
  albumList: [
    { id: 1, name: "My Memories", image: icons.lock },
    // { id: 2, name: "Expat Party", image: icons.people },
  ],
  recentAlbumList: [
    {
      id: 1,
      title: "Expat Party",
      isSelected: false,
    },
    {
      id: 2,
      title: "Expat Party",
      isSelected: false,
    },
    {
      id: 3,
      title: "Expat Party",
      isSelected: false,
    },
  ],
  arrUserList: commonMemberArray,
  arrOfMembersList: [
    {
      title: "Members",
      data: [
        {
          id: 1,
          name: "Max Statham",
          username: "username",
          isSelected: true
        },
        {
          id: 2,
          name: "First Last Name",
          username: "username",
          isSelected: true
        },
      ]
    },
    {
      title: "Sides",
      data: commonMemberArray
    },
  ],
};

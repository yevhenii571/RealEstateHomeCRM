import { DeleteIcon, DownloadIcon, LinkIcon, ViewIcon } from '@chakra-ui/icons';
import { Collapse, Flex, Icon, IconButton, List, ListIcon, ListItem, Menu, MenuButton, MenuItem, MenuList, Text } from '@chakra-ui/react';
import React, { useState } from 'react'
import { FcOpenedFolder } from 'react-icons/fc';
import { FiChevronDown, FiChevronRight, FiFile } from 'react-icons/fi';
import { IoIosContact } from 'react-icons/io';
import { MdLeaderboard } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import Delete from 'views/admin/document/component/Delete';
import LinkModel from 'views/admin/document/component/LinkModel';
import { CiMenuKebab } from "react-icons/ci";

const FolderTreeView = ({ data, deleteFile, item, download, name, isFile, children, setLinkDocument }) => {
    const [isOpen, setIsOpen] = useState(false);
    // const user = localStorage.getItem('user');
    const [deleteModel, setDelete] = useState(false);
    const [linkModel, setLinkModel] = useState(false);
    const [id, setId] = useState(false);
    const navigate = useNavigate()

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };
    const isFolder = !isFile && !!children;

    const handleClick = (data) => {
        download(data)
    }

    const deletedata = (data) => {
        setDelete(true)
        setId(data)
    }

    const handleLinkClick = (data) => {
        setLinkModel(true)
        setId(data)
    }
    const user = JSON.parse(localStorage.getItem("user"))

    function isImageUrl(url) {
        const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp'];
        const urlExtension = url.substring(url.lastIndexOf('.')).toLowerCase();
        return imageExtensions.includes(urlExtension);
    }
    return (
        <List width={'100%'} >
            <ListItem alignItems={'center'} display={'flex'} >
                <Text alignItems={'center'} justifyContent={'space-between'} display={'flex'} width={'100%'} onClick={isFolder ? handleToggle : undefined} _hover={{ cursor: 'pointer', textDecoration: 'none' }}>
                    <Flex width={'70%'} alignItems={'center'}>
                        <ListIcon as={isFile ? FiFile : FcOpenedFolder} />
                        {isFolder && (isOpen ? <FiChevronDown /> : <FiChevronRight />)}
                        {name}
                    </Flex>
                    {item?.createByName ? <Text>({item?.createByName}) </Text> : null}
                    {!isFolder &&
                        <Flex justifyContent={'right'} width={'100%'}  >
                            <Menu isLazy  >
                                <MenuButton><CiMenuKebab /></MenuButton>
                                <MenuList position={'absolute'} right={-5} pl={'0.5em'} pr={'2em'} minW={'fit-content'} >
                                    {data?.linkContact ?
                                        <MenuItem onClick={() => navigate(user?.role !== 'admin' ? `/contactView/${data?.linkContact}` : `/admin/contactView/${data?.linkContact}`)} icon={<IoIosContact fontSize={15} />}>Linked Contact</MenuItem>
                                        : data?.linkLead && <MenuItem onClick={() => navigate(user?.role !== 'admin' ? `/leadView/${data?.linkLead}` : `/admin/leadView/${data?.linkLead}`)} icon={<MdLeaderboard fontSize={15} />}>Linked Lead</MenuItem>
                                    }
                                    <MenuItem color={'blue'} onClick={() => handleLinkClick(data?._id)} icon={<LinkIcon fontSize={15} />}>Link</MenuItem>
                                    {isImageUrl(data?.img) && <MenuItem color={'green'} onClick={() => window.open(data?.img)} icon={<ViewIcon fontSize={15} />}>View</MenuItem>}
                                    <MenuItem onClick={() => handleClick(data?._id)} icon={<DownloadIcon fontSize={15} />}>Download</MenuItem>
                                    <MenuItem color={'red'} onClick={() => deletedata(data?._id)} icon={<DeleteIcon fontSize={15} />}>Delete</MenuItem>
                                </MenuList>
                            </Menu>
                        </Flex>
                    }
                    <Delete isOpen={deleteModel} onClose={setDelete} method='one' deleteFile={deleteFile} id={id} />
                    <LinkModel isOpen={linkModel} setLinkDocument={setLinkDocument} onClose={setLinkModel} id={id} />
                </Text>
            </ListItem>
            {
                isFolder && (
                    <Collapse in={isOpen} animateOpacity>
                        <List styleType="disc" ml={4}>
                            {children}
                        </List>
                    </Collapse>
                )
            }
        </List>
    );
};


export default FolderTreeView

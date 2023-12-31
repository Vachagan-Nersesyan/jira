import React, { useEffect } from 'react'
import styles from './MainBarWorkStl.module.css'
import { Dropdown, Space, Tabs, MenuProps } from 'antd'
import { FaAngleDown, FaJs } from 'react-icons/fa6'
import { NavLink } from 'react-router-dom'
import type { TabsProps } from 'antd';
import { useSelector } from 'react-redux'
import { AppStateType } from '../../../redux/redux-store'
import { IssuesType } from '../../../redux/issuesReducer'

let assigneeUserIssuesArr: Array<IssuesType> = []
let recentUserIssuesArr: Array<IssuesType> = []
let boardUserIssuesArr: Array<BoardUserIssuesArrType> = []

type BoardUserIssuesArrType = {
    id: number,
    boardName: string
}


const MainBarWorkComp: React.FC<OwnProps> = () => {

    const projectCompArr = useSelector((state: AppStateType) => state.project.projectArr)



    useEffect(() => {

        assigneeUserIssuesArr = []
        recentUserIssuesArr = []
        boardUserIssuesArr = []
        // debugger

        let current = new Date();
        let cDate = current.getFullYear() + '-' + (current.getMonth() + 1) + '-' + current.getDate();

        projectCompArr.map((val, ind1) => {
            val.board.boardArr.map((val1) => {
                val1.boardIssue.map((val2) => {
                    if (val2.assignee === 'Vachagan') {
                        assigneeUserIssuesArr.push(val2)
                    }


                    if (val2.currentDate === cDate) {
                        recentUserIssuesArr.push(val2)
                    }
                })
            })
            boardUserIssuesArr.push({ id: ind1, boardName: val.board.boardUniqName })

        })
        console.log(projectCompArr)

    }, [projectCompArr])

    console.log(projectCompArr)


    const tabItems: TabsProps['items'] = [
        {
            key: '1',
            label: 'Assigned to me',
            children: (
                <div className={styles.menu_work_content}>
                    <div className={styles.menu_work_content_1_item}>
                        {
                            assigneeUserIssuesArr.length === 0
                                ?
                                <div>
                                    there isnt issue
                                </div>
                                :
                                <div>
                                    <div className={styles.menu_work_content_1_item_1_title}>
                                        IN PROGRESS
                                    </div>
                                    <div className={styles.menu_work_content_1_item_2_itm}>

                                        {assigneeUserIssuesArr.map((val) => {
                                            return (
                                                <NavLink to={`/jiraItems/issues/${val.id}`}>
                                                    <div className={styles.menu_work_content_1_item_2_itm_in_1_itm}>
                                                        <FaJs />
                                                    </div>
                                                    <div className={styles.menu_work_content_1_item_2_itm_in_1_itm}>
                                                        <div className={styles.menu_work_content_1_item_2_itm_in_1_itm_1_itm}>
                                                            {val.summary}
                                                        </div>
                                                        <div className={styles.menu_work_content_1_item_2_itm_in_1_itm_2_itm}>
                                                            {val.issueShortName} . {val.issuesProject}
                                                        </div>
                                                    </div>
                                                </NavLink>
                                            )
                                        })}


                                    </div>
                                </div>
                        }
                    </div>
                    <div className={styles.menu_work_content_border}></div>
                    <div className={styles.menu_work_content}>
                        <NavLink to={'/jiraItems/projectsWork'}>
                            <div className={styles.menu_work_content_ovrl}>
                                Go to Your Work page
                            </div>
                        </NavLink>
                    </div>
                </div>
            ),
        },
        {
            key: '2',
            label: 'Recent',
            children: (
                <div className={styles.menu_work_content}>
                    <div className={styles.menu_work_content_1_item}>
                        <div className={styles.menu_work_content_1_item_1_title}>
                            WORKED ON
                        </div>
                        <div className={styles.menu_work_content_1_item_2_itm}>
                            {
                                recentUserIssuesArr.map((val) => {

                                    return (
                                        <NavLink to={`/jiraItems/issues/${val.id}`}>
                                            <div className={styles.menu_work_content_1_item_2_itm_in_1_itm}>
                                                <FaJs />
                                            </div>
                                            <div className={styles.menu_work_content_1_item_2_itm_in_1_itm}>
                                                <div className={styles.menu_work_content_1_item_2_itm_in_1_itm_1_itm}>
                                                    {val.summary}
                                                </div>
                                                <div className={styles.menu_work_content_1_item_2_itm_in_1_itm_2_itm}>
                                                    {val.issueShortName} . {val.issuesProject}
                                                </div>
                                            </div>
                                        </NavLink>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className={styles.menu_work_content_border}>

                    </div>
                    <div className={styles.menu_work_content}>
                        <NavLink to={'/jiraItems/projectsWork'}>
                            Go to Your Work page
                        </NavLink>
                    </div>
                </div>
            ),
        },
        {
            key: '3',
            label: 'Boards',
            children: (
                <div className={styles.menu_work_content}>
                    <div className={styles.menu_work_content_1_item}>
                        <div className={styles.menu_work_content_1_item_1_title}>
                            RECENT
                        </div>
                        <div className={styles.menu_work_content_1_item_2_itm}>
                            {
                                boardUserIssuesArr.map((val) => {

                                    return (
                                        <NavLink to={`/jiraItems/board/${val.id}`}>
                                            <div className={styles.menu_work_content_1_item_2_itm_in_1_itm}>
                                                <FaJs />
                                            </div>
                                            <div className={styles.menu_work_content_1_item_2_itm_in_1_itm}>
                                                <div className={styles.menu_work_content_1_item_2_itm_in_1_itm_1_itm}>
                                                    {val.boardName}
                                                </div>
                                            </div>
                                        </NavLink>
                                    )
                                })
                            }

                        </div>
                    </div>
                    <div className={styles.menu_work_content_border}>

                    </div>
                    <div className={styles.menu_work_content}>
                        {/* anel */}
                        <NavLink to={'/'}>
                            View all boards
                        </NavLink>
                    </div>
                </div>
            )
        },
    ];

    const workItems: MenuProps['items'] = [
        {
            label: (
                <div className={styles.main_bar_work_title_tab_content}>
                    <Tabs className={styles.main_bar_work_title_tab_content_tab} defaultActiveKey="1" items={tabItems} />
                </div>
            ),
            key: '0',
        }
    ];

    return (
        <div>
            <Dropdown overlayClassName={styles.main_bar_itms_stl} menu={{ items: workItems }} trigger={['click']}>
                <div className={styles.main_bar_itms_stl_title}>
                    <Space >
                        Your work <FaAngleDown />
                    </Space>
                </div>
            </Dropdown>
        </div>
    )
}


export default MainBarWorkComp

type OwnProps = {}
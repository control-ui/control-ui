import React from "react";
import {Typography} from "@material-ui/core";
import {PageBox, PageContent} from "@control-ui/kit/PageContent";
import NavProject from "../component/NavProject";
import {Head} from "@control-ui/kit/Head";
import {Logo} from '../asset/logo';
import {LinkButton} from "@control-ui/kit/Link/LinkButton";
import {MdCode} from "@control-ui/docs/Markdown/Code";

const H = ({level, ...p}) => <Typography component={'h' + level} variant={'h' + level} gutterBottom style={{marginTop: 36 / (level / 2)}} {...p}/>;
const P = (p) => <Typography component={'p'} variant={'body1'} gutterBottom {...p}/>;

export default function PageMain() {
    return (
        <>
            <Head
                title={'Control-UI'}
                description={'React Components for Web-Apps, with or without API, using the Material-UI Design-System.'}
            />
            <PageContent>
                <Logo width={150} style={{marginTop: 24}}/>
                <PageBox
                    title={'Control-UI'}
                >

                    <P>
                        <strong>React Components</strong> for Web-Apps, built with Material-UI.
                    </P>
                    <P>
                        Jump start your progressive web app with translation, layout, routing and a lot more.
                    </P>

                    <H level={2}>Control-UI: App</H>
                    <P>Layout Components and App starter for any PWA. Initializes provider for i18n, router, drawer and theme.</P>
                    <MdCode children={'npx create-react-app my-app --template control-ui-app'}/>
                    <LinkButton to={'/app/overview'} variant={'outlined'}>more</LinkButton>

                    <H level={2}>Control-UI: Docs</H>
                    <P>Components and providers for documentation apps.</P>
                    <MdCode children={'npx create-react-app my-docs --template control-ui-docs'}/>
                    <LinkButton to={'/docs/overview'} variant={'outlined'}>more</LinkButton>

                    <H level={2}>Control-UI: Kit</H>
                    <P>Material-UI Component Kit - for any web-app.</P>
                    <P>Loading, Content, Menus, Lists, Links, Settings, Tooltips, DataGrids and more.</P>
                    <LinkButton to={'/kit/overview'} variant={'outlined'}>more</LinkButton>

                    <H level={3}>Control-UI: Locales</H>
                    <P>Translations for control-ui apps, split by language and feature, made for `i18next`.</P>
                    <LinkButton to={'/locales/overview'} variant={'outlined'}>more</LinkButton>
                </PageBox>
                <PageBox>
                    <NavProject/>
                </PageBox>
            </PageContent>
        </>
    );
}

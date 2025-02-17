import React, { useRef } from 'react'
import { useRouter } from 'next/router'
import Nprogress from 'nprogress'

import Grid from '@material-ui/core/Grid'
import Modal from '@components/ModalAlert'

import Table from '@components/Table'
import searchMaterialStyles from '@styles/pages/Search'
import { getUsersSearc } from '@shared/useQuery'
import { DATA_USER } from '@shared/graphql'
import { Typography } from '@material-ui/core'
import Footer from '@components/Footer'
import {useGlobalContextData} from '@store/globalContext'
import Header from '@components/Header'

const Search: React.FC = () => {
  const {
    query: { login }
  } = useRouter()
  const {visibleModal, setVisibleModal} = useGlobalContextData()
  const classes = searchMaterialStyles()
  const Router = useRouter()
  const { loading, error, data } = getUsersSearc({ login }, DATA_USER)

  if (loading) {
    Nprogress.start()
    return (
      <>
        <Header />
        <main className={classes.mainSearch}>
        </main>
        <Footer />
      </>
    )
  }
  if (error) {
    setVisibleModal(true)
    Router.push('/')
  }

  return (
    <>
      {visibleModal && <Modal />}
      <Header />
      <main className={classes.mainSearch}>
        <Grid
          container
          direction='row'
          alignItems='flex-end'
          className={classes.containerAvatarRepos}
        >
          <img src={data.user.avatarUrl} alt={`photo ${data.user.name}`} className={classes.avatar}/>
          <Grid container direction='column' className={classes.infoUser}>
            <Typography variant='h2' className={classes.userName}>{data.user.name}</Typography>
            <Grid
              container direction='row'
              alignItems='center'
              className={classes.containerSquare}
            >
              <Grid className={classes.retangle}/>
              <Grid
                container
                direction='column'
                justifyContent='center'
                alignItems='center'
                className={classes.containerRepoCount}
              >
                <strong >{data.user.repositories.totalCount}</strong>
                <p className={classes.repositoriesSquare}>Repositórios</p>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Table
          login={login as string}
        />
      </main>
      <Footer />
    </>
  )
}

export default Search

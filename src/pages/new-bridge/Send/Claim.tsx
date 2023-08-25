import { useEffect } from "react"

import { Box, Typography } from "@mui/material"
import { styled } from "@mui/system"

import { BRIDGE_PAGE_SIZE } from "@/constants"
import { useApp } from "@/contexts/AppContextProvider"
import { useRainbowContext } from "@/contexts/RainbowProvider"
import ClaimTable from "@/pages/new-bridge/components/ClaimTable"
import useClaimStore from "@/stores/claimStore"

const TableBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
}))

const Claim = (props: any) => {
  const { walletCurrentAddress } = useRainbowContext()
  const {
    claim: { refreshPageTransactions },
  } = useApp()

  const { page, total, pageTransactions } = useClaimStore()

  useEffect(() => {
    handleChangePage(1)
  }, [walletCurrentAddress])

  const handleChangePage = currentPage => {
    refreshPageTransactions(currentPage)
  }

  return (
    <TableBox>
      {pageTransactions?.length ? (
        <ClaimTable
          data={pageTransactions}
          pagination={{
            count: Math.ceil(total / BRIDGE_PAGE_SIZE),
            page,
            onChange: handleChangePage,
          }}
        />
      ) : (
        <Typography variant="body1" color="textSecondary" sx={{ width: "40rem" }}>
          Your claimable transactions will appear here...
        </Typography>
      )}
    </TableBox>
  )
}

export default Claim
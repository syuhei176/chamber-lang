contract RPS {


  /**
  * @dev RPS.commit
  */
  function commit(Tx transaction)
  internal
  pure
  {
    /*
    [annotations: client_verification&exit]
      continuable  (bytes hashedHandB =&gt; bytes), (bytes hashedHandA =&gt; bytes)
    */

  }

  /**
  * @dev RPS.reveal
  */
  function reveal(Tx transaction)
  internal
  pure
  {
    /*
    [annotations: client_verification&exit]
      finish  
      justsig-required  
    */

  }


}

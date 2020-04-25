# API Documentation

### `/contracts`
#### Endpoint: [https://l83v1lhe72.execute-api.us-east-2.amazonaws.com/dev/contracts]()
#### Basic Function
Returns all contracts
#### Parameters
| Parameter Name|Return                                                                                            |
|-----------------|--------------------------------------------------------------------------------------------------|
| `id`            | Contract matching given id.|
| `committee-id`  | Used in conjunction with `buyer-id`, returns all contracts with matching committee and buyer.|
| `buyer-id`      | Used in conjunction with `committee-id`, returns all contracts with matching committee and buyer. |
| `market`        | All contracts with matching market.|
| `range`         | All contracts within given range.|
### `/buyers`
#### Endpoint: [https://l83v1lhe72.execute-api.us-east-2.amazonaws.com/dev/buyers]()
#### Basic Function
Returns all buyers

#### Parameters
| Parameter Name|Return                                                                                            |
|-----------------|--------------------------------------------------------------------------------------------------|
| `id`            | Buyer matching given id.|

### `/committees`
#### Endpoint: [https://l83v1lhe72.execute-api.us-east-2.amazonaws.com/dev/committees]()
#### Basic Function
Returns all committees

#### Parameters
| Parameter Name|Return                                                                                            |
|-----------------|--------------------------------------------------------------------------------------------------|
| `id`            | Committee matching given id.|
| `buyer-id`      | All committees with matching buyer. |

### `/stations`
#### Endpoint: [https://l83v1lhe72.execute-api.us-east-2.amazonaws.com/dev/stations]()
#### Basic Function
Returns all stations

#### Parameters
| Parameter Name|Return                                                                                            |
|-----------------|--------------------------------------------------------------------------------------------------|
| `id`            | Station matching given id.|
| `market`        | All stations with matching market.|



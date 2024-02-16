import { useQuery } from "@tanstack/react-query";

import { BLOCKCHAIN_API } from "@/constants/constants";
const BLOCKCHAIN_TRANSACTIONS = "/v0/search/transactions";

function useGetAccountHistory(account: string) {
  const searchParams = new URLSearchParams();
  searchParams.append("q", `(auth:${account} OR receiver:${account})`);
  searchParams.append("limit", "10");
  searchParams.append("block_count", "5000000");
  searchParams.append("with_reversible", "true");
  searchParams.append("sort", "desc");
  searchParams.append("start_block", "0");
  const url = `${BLOCKCHAIN_API}${BLOCKCHAIN_TRANSACTIONS}?${searchParams}`;

  return useQuery({
    queryKey: ["GetAccountHistory"],
    queryFn: () => fetch(url).then((res) => res.json()),
  });
}

export default useGetAccountHistory;

export interface WalletTransactionHistory {
  cursor: string;
  transactions: Array<{
    action_idx: Array<number>;
    lifecycle: {
      canceled_by: unknown;
      created_by: unknown;
      creation_tree: Array<Array<number>>;
      dbops?: Array<{
        account: string;
        action_idx: number;
        key: string;
        new: {
          hex?: string;
          payer?: string;
        };
        old: {
          hex?: string;
          payer?: string;
        };
        op: string;
        scope: string;
        table: string;
      }>;
      dtrx_cancelation_irreversible: boolean;
      dtrx_creation_irreversible: boolean;
      dtrxops: unknown;
      execution_block_header: {
        action_mroot: string;
        confirmed: number;
        header_extensions: unknown;
        previous: string;
        producer: string;
        schedule_version: number;
        timestamp: string;
        transaction_mroot: string;
      };
      execution_irreversible: boolean;
      execution_trace: {
        action_traces: Array<{
          account_ram_deltas?: Array<{
            account: string;
            delta: number;
          }>;
          act: {
            account: string;
            authorization: Array<{
              actor: string;
              permission: string;
            }>;
            data: {
              account?: string;
              auth?: {
                accounts: Array<{
                  permission: {
                    actor: string;
                    permission: string;
                  };
                  weight: number;
                }>;
                keys: Array<{
                  key: string;
                  weight: number;
                }>;
                threshold: number;
                waits: Array<unknown>;
              };
              correlation_id?: string;
              from?: string;
              memo?: string;
              message_json?: string;
              new_idp_proofs?: Array<{
                id: string;
                id_provider: string;
                sig: string;
              }>;
              no_of_required_idp?: number;
              parent?: string;
              payer?: string;
              permission?: string;
              quantity?: string;
              required_proofs?: Array<{
                id: string;
                id_provider: string;
                sig: string;
              }>;
              to?: string;
            };
            hex_data: string;
            name: string;
          };
          action_ordinal: number;
          block_num: number;
          block_time: string;
          closest_unnotified_ancestor_action_ordinal: number;
          console: string;
          context_free: boolean;
          creator_action_ordinal: number;
          elapsed: number;
          except: unknown;
          inline_traces: Array<{
            account_ram_deltas: unknown;
            act: {
              account: string;
              authorization: Array<{
                actor: string;
                permission: string;
              }>;
              data: {
                account?: string;
                auth?: {
                  accounts: Array<unknown>;
                  keys: Array<{
                    key: string;
                    weight: number;
                  }>;
                  threshold: number;
                  waits: Array<unknown>;
                };
                from?: string;
                memo?: string;
                parent?: string;
                permission?: string;
                quantity?: string;
                to?: string;
              };
              hex_data: string;
              name: string;
            };
            action_ordinal: number;
            block_num: number;
            block_time: string;
            closest_unnotified_ancestor_action_ordinal: number;
            console: string;
            context_free: boolean;
            creator_action_ordinal: number;
            elapsed: number;
            except: unknown;
            inline_traces: Array<unknown>;
            producer_block_id: string;
            receipt: {
              abi_sequence: number;
              act_digest: string;
              auth_sequence: Array<[string, number]>;
              code_sequence: number;
              global_sequence: number;
              receiver: string;
              recv_sequence: number;
            };
            receiver: string;
            trx_id: string;
          }>;
          producer_block_id: string;
          receipt: {
            abi_sequence: number;
            act_digest: string;
            auth_sequence: Array<[string, number]>;
            code_sequence: number;
            global_sequence: number;
            receiver: string;
            recv_sequence: number;
          };
          receiver: string;
          trx_id: string;
        }>;
        block_num: number;
        block_time: string;
        elapsed: number;
        except: unknown;
        failed_dtrx_trace: unknown;
        id: string;
        net_usage: number;
        producer_block_id: string;
        receipt: {
          cpu_usage_us: number;
          net_usage_words: number;
          status: string;
        };
        scheduled: boolean;
      };
      id: string;
      pub_keys: Array<string>;
      ramops?: Array<{
        action: string;
        action_idx: number;
        delta: number;
        family: string;
        op: string;
        payer: string;
        usage: number;
      }>;
      tableops?: Array<{
        action_idx: number;
        op: string;
        path: string;
        payer: string;
      }>;
      transaction: {
        actions: Array<{
          account: string;
          authorization: Array<{
            actor: string;
            permission: string;
          }>;
          data: unknown;
          hex_data: string;
          name: string;
        }>;
        context_free_actions: unknown;
        context_free_data: Array<unknown>;
        delay_sec: number;
        expiration: string;
        max_cpu_usage_ms: number;
        max_net_usage_words: number;
        ref_block_num: number;
        ref_block_prefix: number;
        signatures: Array<string>;
        transaction_extensions: unknown;
      };
      transaction_status: string;
    };
  }>;
}

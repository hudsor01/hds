/******************************************************************************
 * This file was generated by ZenStack CLI.
 ******************************************************************************/

/* eslint-disable */
// @ts-nocheck

import type { Prisma, password_reset_requests } from '@prisma/client'
import type {
    UseMutationOptions,
    UseQueryOptions,
    UseInfiniteQueryOptions,
    InfiniteData
} from '@tanstack/react-query'
import { getHooksContext } from '@zenstackhq/tanstack-query/runtime-v5/react'
import {
    useModelQuery,
    useInfiniteModelQuery,
    useModelMutation
} from '@zenstackhq/tanstack-query/runtime-v5/react'
import type {
    PickEnumerable,
    CheckSelect,
    QueryError,
    ExtraQueryOptions,
    ExtraMutationOptions
} from '@zenstackhq/tanstack-query/runtime-v5'
import type { PolicyCrudKind } from '@zenstackhq/runtime'
import metadata from './__model_meta'
type DefaultError = QueryError
import {
    useSuspenseModelQuery,
    useSuspenseInfiniteModelQuery
} from '@zenstackhq/tanstack-query/runtime-v5/react'
import type {
    UseSuspenseQueryOptions,
    UseSuspenseInfiniteQueryOptions
} from '@tanstack/react-query'

export function useCreatepassword_reset_requests(
    options?: Omit<
        UseMutationOptions<
            password_reset_requests | undefined,
            DefaultError,
            Prisma.password_reset_requestsCreateArgs
        > &
            ExtraMutationOptions,
        'mutationFn'
    >
) {
    const { endpoint, fetch } = getHooksContext()
    const _mutation = useModelMutation<
        Prisma.password_reset_requestsCreateArgs,
        DefaultError,
        password_reset_requests,
        true
    >(
        'password_reset_requests',
        'POST',
        `${endpoint}/password_reset_requests/create`,
        metadata,
        options,
        fetch,
        true
    )
    const mutation = {
        ..._mutation,
        mutateAsync: async <
            T extends Prisma.password_reset_requestsCreateArgs
        >(
            args: Prisma.SelectSubset<
                T,
                Prisma.password_reset_requestsCreateArgs
            >,
            options?: Omit<
                UseMutationOptions<
                    | CheckSelect<
                          T,
                          password_reset_requests,
                          Prisma.password_reset_requestsGetPayload<T>
                      >
                    | undefined,
                    DefaultError,
                    Prisma.SelectSubset<
                        T,
                        Prisma.password_reset_requestsCreateArgs
                    >
                > &
                    ExtraMutationOptions,
                'mutationFn'
            >
        ) => {
            return (await _mutation.mutateAsync(
                args,
                options as any
            )) as
                | CheckSelect<
                      T,
                      password_reset_requests,
                      Prisma.password_reset_requestsGetPayload<T>
                  >
                | undefined
        }
    }
    return mutation
}

export function useCreateManypassword_reset_requests(
    options?: Omit<
        UseMutationOptions<
            Prisma.BatchPayload,
            DefaultError,
            Prisma.password_reset_requestsCreateManyArgs
        > &
            ExtraMutationOptions,
        'mutationFn'
    >
) {
    const { endpoint, fetch } = getHooksContext()
    const _mutation = useModelMutation<
        Prisma.password_reset_requestsCreateManyArgs,
        DefaultError,
        Prisma.BatchPayload,
        false
    >(
        'password_reset_requests',
        'POST',
        `${endpoint}/password_reset_requests/createMany`,
        metadata,
        options,
        fetch,
        false
    )
    const mutation = {
        ..._mutation,
        mutateAsync: async <
            T extends Prisma.password_reset_requestsCreateManyArgs
        >(
            args: Prisma.SelectSubset<
                T,
                Prisma.password_reset_requestsCreateManyArgs
            >,
            options?: Omit<
                UseMutationOptions<
                    Prisma.BatchPayload,
                    DefaultError,
                    Prisma.SelectSubset<
                        T,
                        Prisma.password_reset_requestsCreateManyArgs
                    >
                > &
                    ExtraMutationOptions,
                'mutationFn'
            >
        ) => {
            return (await _mutation.mutateAsync(
                args,
                options as any
            )) as Prisma.BatchPayload
        }
    }
    return mutation
}

export function useFindManypassword_reset_requests<
    TArgs extends Prisma.password_reset_requestsFindManyArgs,
    TQueryFnData = Array<
        Prisma.password_reset_requestsGetPayload<TArgs> & {
            $optimistic?: boolean
        }
    >,
    TData = TQueryFnData,
    TError = DefaultError
>(
    args?: Prisma.SelectSubset<
        TArgs,
        Prisma.password_reset_requestsFindManyArgs
    >,
    options?: Omit<
        UseQueryOptions<TQueryFnData, TError, TData>,
        'queryKey'
    > &
        ExtraQueryOptions
) {
    const { endpoint, fetch } = getHooksContext()
    return useModelQuery<TQueryFnData, TData, TError>(
        'password_reset_requests',
        `${endpoint}/password_reset_requests/findMany`,
        args,
        options,
        fetch
    )
}

export function useInfiniteFindManypassword_reset_requests<
    TArgs extends Prisma.password_reset_requestsFindManyArgs,
    TQueryFnData = Array<
        Prisma.password_reset_requestsGetPayload<TArgs>
    >,
    TData = TQueryFnData,
    TError = DefaultError
>(
    args?: Prisma.SelectSubset<
        TArgs,
        Prisma.password_reset_requestsFindManyArgs
    >,
    options?: Omit<
        UseInfiniteQueryOptions<
            TQueryFnData,
            TError,
            InfiniteData<TData>
        >,
        'queryKey' | 'initialPageParam'
    >
) {
    options = options ?? { getNextPageParam: () => null }
    const { endpoint, fetch } = getHooksContext()
    return useInfiniteModelQuery<TQueryFnData, TData, TError>(
        'password_reset_requests',
        `${endpoint}/password_reset_requests/findMany`,
        args,
        options,
        fetch
    )
}

export function useSuspenseFindManypassword_reset_requests<
    TArgs extends Prisma.password_reset_requestsFindManyArgs,
    TQueryFnData = Array<
        Prisma.password_reset_requestsGetPayload<TArgs> & {
            $optimistic?: boolean
        }
    >,
    TData = TQueryFnData,
    TError = DefaultError
>(
    args?: Prisma.SelectSubset<
        TArgs,
        Prisma.password_reset_requestsFindManyArgs
    >,
    options?: Omit<
        UseSuspenseQueryOptions<TQueryFnData, TError, TData>,
        'queryKey'
    > &
        ExtraQueryOptions
) {
    const { endpoint, fetch } = getHooksContext()
    return useSuspenseModelQuery<TQueryFnData, TData, TError>(
        'password_reset_requests',
        `${endpoint}/password_reset_requests/findMany`,
        args,
        options,
        fetch
    )
}

export function useSuspenseInfiniteFindManypassword_reset_requests<
    TArgs extends Prisma.password_reset_requestsFindManyArgs,
    TQueryFnData = Array<
        Prisma.password_reset_requestsGetPayload<TArgs>
    >,
    TData = TQueryFnData,
    TError = DefaultError
>(
    args?: Prisma.SelectSubset<
        TArgs,
        Prisma.password_reset_requestsFindManyArgs
    >,
    options?: Omit<
        UseSuspenseInfiniteQueryOptions<
            TQueryFnData,
            TError,
            InfiniteData<TData>
        >,
        'queryKey' | 'initialPageParam'
    >
) {
    options = options ?? { getNextPageParam: () => null }
    const { endpoint, fetch } = getHooksContext()
    return useSuspenseInfiniteModelQuery<TQueryFnData, TData, TError>(
        'password_reset_requests',
        `${endpoint}/password_reset_requests/findMany`,
        args,
        options,
        fetch
    )
}

export function useFindUniquepassword_reset_requests<
    TArgs extends Prisma.password_reset_requestsFindUniqueArgs,
    TQueryFnData = Prisma.password_reset_requestsGetPayload<TArgs> & {
        $optimistic?: boolean
    },
    TData = TQueryFnData,
    TError = DefaultError
>(
    args: Prisma.SelectSubset<
        TArgs,
        Prisma.password_reset_requestsFindUniqueArgs
    >,
    options?: Omit<
        UseQueryOptions<TQueryFnData, TError, TData>,
        'queryKey'
    > &
        ExtraQueryOptions
) {
    const { endpoint, fetch } = getHooksContext()
    return useModelQuery<TQueryFnData, TData, TError>(
        'password_reset_requests',
        `${endpoint}/password_reset_requests/findUnique`,
        args,
        options,
        fetch
    )
}

export function useSuspenseFindUniquepassword_reset_requests<
    TArgs extends Prisma.password_reset_requestsFindUniqueArgs,
    TQueryFnData = Prisma.password_reset_requestsGetPayload<TArgs> & {
        $optimistic?: boolean
    },
    TData = TQueryFnData,
    TError = DefaultError
>(
    args: Prisma.SelectSubset<
        TArgs,
        Prisma.password_reset_requestsFindUniqueArgs
    >,
    options?: Omit<
        UseSuspenseQueryOptions<TQueryFnData, TError, TData>,
        'queryKey'
    > &
        ExtraQueryOptions
) {
    const { endpoint, fetch } = getHooksContext()
    return useSuspenseModelQuery<TQueryFnData, TData, TError>(
        'password_reset_requests',
        `${endpoint}/password_reset_requests/findUnique`,
        args,
        options,
        fetch
    )
}

export function useFindFirstpassword_reset_requests<
    TArgs extends Prisma.password_reset_requestsFindFirstArgs,
    TQueryFnData = Prisma.password_reset_requestsGetPayload<TArgs> & {
        $optimistic?: boolean
    },
    TData = TQueryFnData,
    TError = DefaultError
>(
    args?: Prisma.SelectSubset<
        TArgs,
        Prisma.password_reset_requestsFindFirstArgs
    >,
    options?: Omit<
        UseQueryOptions<TQueryFnData, TError, TData>,
        'queryKey'
    > &
        ExtraQueryOptions
) {
    const { endpoint, fetch } = getHooksContext()
    return useModelQuery<TQueryFnData, TData, TError>(
        'password_reset_requests',
        `${endpoint}/password_reset_requests/findFirst`,
        args,
        options,
        fetch
    )
}

export function useSuspenseFindFirstpassword_reset_requests<
    TArgs extends Prisma.password_reset_requestsFindFirstArgs,
    TQueryFnData = Prisma.password_reset_requestsGetPayload<TArgs> & {
        $optimistic?: boolean
    },
    TData = TQueryFnData,
    TError = DefaultError
>(
    args?: Prisma.SelectSubset<
        TArgs,
        Prisma.password_reset_requestsFindFirstArgs
    >,
    options?: Omit<
        UseSuspenseQueryOptions<TQueryFnData, TError, TData>,
        'queryKey'
    > &
        ExtraQueryOptions
) {
    const { endpoint, fetch } = getHooksContext()
    return useSuspenseModelQuery<TQueryFnData, TData, TError>(
        'password_reset_requests',
        `${endpoint}/password_reset_requests/findFirst`,
        args,
        options,
        fetch
    )
}

export function useUpdatepassword_reset_requests(
    options?: Omit<
        UseMutationOptions<
            password_reset_requests | undefined,
            DefaultError,
            Prisma.password_reset_requestsUpdateArgs
        > &
            ExtraMutationOptions,
        'mutationFn'
    >
) {
    const { endpoint, fetch } = getHooksContext()
    const _mutation = useModelMutation<
        Prisma.password_reset_requestsUpdateArgs,
        DefaultError,
        password_reset_requests,
        true
    >(
        'password_reset_requests',
        'PUT',
        `${endpoint}/password_reset_requests/update`,
        metadata,
        options,
        fetch,
        true
    )
    const mutation = {
        ..._mutation,
        mutateAsync: async <
            T extends Prisma.password_reset_requestsUpdateArgs
        >(
            args: Prisma.SelectSubset<
                T,
                Prisma.password_reset_requestsUpdateArgs
            >,
            options?: Omit<
                UseMutationOptions<
                    | CheckSelect<
                          T,
                          password_reset_requests,
                          Prisma.password_reset_requestsGetPayload<T>
                      >
                    | undefined,
                    DefaultError,
                    Prisma.SelectSubset<
                        T,
                        Prisma.password_reset_requestsUpdateArgs
                    >
                > &
                    ExtraMutationOptions,
                'mutationFn'
            >
        ) => {
            return (await _mutation.mutateAsync(
                args,
                options as any
            )) as
                | CheckSelect<
                      T,
                      password_reset_requests,
                      Prisma.password_reset_requestsGetPayload<T>
                  >
                | undefined
        }
    }
    return mutation
}

export function useUpdateManypassword_reset_requests(
    options?: Omit<
        UseMutationOptions<
            Prisma.BatchPayload,
            DefaultError,
            Prisma.password_reset_requestsUpdateManyArgs
        > &
            ExtraMutationOptions,
        'mutationFn'
    >
) {
    const { endpoint, fetch } = getHooksContext()
    const _mutation = useModelMutation<
        Prisma.password_reset_requestsUpdateManyArgs,
        DefaultError,
        Prisma.BatchPayload,
        false
    >(
        'password_reset_requests',
        'PUT',
        `${endpoint}/password_reset_requests/updateMany`,
        metadata,
        options,
        fetch,
        false
    )
    const mutation = {
        ..._mutation,
        mutateAsync: async <
            T extends Prisma.password_reset_requestsUpdateManyArgs
        >(
            args: Prisma.SelectSubset<
                T,
                Prisma.password_reset_requestsUpdateManyArgs
            >,
            options?: Omit<
                UseMutationOptions<
                    Prisma.BatchPayload,
                    DefaultError,
                    Prisma.SelectSubset<
                        T,
                        Prisma.password_reset_requestsUpdateManyArgs
                    >
                > &
                    ExtraMutationOptions,
                'mutationFn'
            >
        ) => {
            return (await _mutation.mutateAsync(
                args,
                options as any
            )) as Prisma.BatchPayload
        }
    }
    return mutation
}

export function useUpsertpassword_reset_requests(
    options?: Omit<
        UseMutationOptions<
            password_reset_requests | undefined,
            DefaultError,
            Prisma.password_reset_requestsUpsertArgs
        > &
            ExtraMutationOptions,
        'mutationFn'
    >
) {
    const { endpoint, fetch } = getHooksContext()
    const _mutation = useModelMutation<
        Prisma.password_reset_requestsUpsertArgs,
        DefaultError,
        password_reset_requests,
        true
    >(
        'password_reset_requests',
        'POST',
        `${endpoint}/password_reset_requests/upsert`,
        metadata,
        options,
        fetch,
        true
    )
    const mutation = {
        ..._mutation,
        mutateAsync: async <
            T extends Prisma.password_reset_requestsUpsertArgs
        >(
            args: Prisma.SelectSubset<
                T,
                Prisma.password_reset_requestsUpsertArgs
            >,
            options?: Omit<
                UseMutationOptions<
                    | CheckSelect<
                          T,
                          password_reset_requests,
                          Prisma.password_reset_requestsGetPayload<T>
                      >
                    | undefined,
                    DefaultError,
                    Prisma.SelectSubset<
                        T,
                        Prisma.password_reset_requestsUpsertArgs
                    >
                > &
                    ExtraMutationOptions,
                'mutationFn'
            >
        ) => {
            return (await _mutation.mutateAsync(
                args,
                options as any
            )) as
                | CheckSelect<
                      T,
                      password_reset_requests,
                      Prisma.password_reset_requestsGetPayload<T>
                  >
                | undefined
        }
    }
    return mutation
}

export function useDeletepassword_reset_requests(
    options?: Omit<
        UseMutationOptions<
            password_reset_requests | undefined,
            DefaultError,
            Prisma.password_reset_requestsDeleteArgs
        > &
            ExtraMutationOptions,
        'mutationFn'
    >
) {
    const { endpoint, fetch } = getHooksContext()
    const _mutation = useModelMutation<
        Prisma.password_reset_requestsDeleteArgs,
        DefaultError,
        password_reset_requests,
        true
    >(
        'password_reset_requests',
        'DELETE',
        `${endpoint}/password_reset_requests/delete`,
        metadata,
        options,
        fetch,
        true
    )
    const mutation = {
        ..._mutation,
        mutateAsync: async <
            T extends Prisma.password_reset_requestsDeleteArgs
        >(
            args: Prisma.SelectSubset<
                T,
                Prisma.password_reset_requestsDeleteArgs
            >,
            options?: Omit<
                UseMutationOptions<
                    | CheckSelect<
                          T,
                          password_reset_requests,
                          Prisma.password_reset_requestsGetPayload<T>
                      >
                    | undefined,
                    DefaultError,
                    Prisma.SelectSubset<
                        T,
                        Prisma.password_reset_requestsDeleteArgs
                    >
                > &
                    ExtraMutationOptions,
                'mutationFn'
            >
        ) => {
            return (await _mutation.mutateAsync(
                args,
                options as any
            )) as
                | CheckSelect<
                      T,
                      password_reset_requests,
                      Prisma.password_reset_requestsGetPayload<T>
                  >
                | undefined
        }
    }
    return mutation
}

export function useDeleteManypassword_reset_requests(
    options?: Omit<
        UseMutationOptions<
            Prisma.BatchPayload,
            DefaultError,
            Prisma.password_reset_requestsDeleteManyArgs
        > &
            ExtraMutationOptions,
        'mutationFn'
    >
) {
    const { endpoint, fetch } = getHooksContext()
    const _mutation = useModelMutation<
        Prisma.password_reset_requestsDeleteManyArgs,
        DefaultError,
        Prisma.BatchPayload,
        false
    >(
        'password_reset_requests',
        'DELETE',
        `${endpoint}/password_reset_requests/deleteMany`,
        metadata,
        options,
        fetch,
        false
    )
    const mutation = {
        ..._mutation,
        mutateAsync: async <
            T extends Prisma.password_reset_requestsDeleteManyArgs
        >(
            args: Prisma.SelectSubset<
                T,
                Prisma.password_reset_requestsDeleteManyArgs
            >,
            options?: Omit<
                UseMutationOptions<
                    Prisma.BatchPayload,
                    DefaultError,
                    Prisma.SelectSubset<
                        T,
                        Prisma.password_reset_requestsDeleteManyArgs
                    >
                > &
                    ExtraMutationOptions,
                'mutationFn'
            >
        ) => {
            return (await _mutation.mutateAsync(
                args,
                options as any
            )) as Prisma.BatchPayload
        }
    }
    return mutation
}

export function useAggregatePassword_reset_requests<
    TArgs extends Prisma.Password_reset_requestsAggregateArgs,
    TQueryFnData = Prisma.GetPassword_reset_requestsAggregateType<TArgs>,
    TData = TQueryFnData,
    TError = DefaultError
>(
    args: Prisma.SelectSubset<
        TArgs,
        Prisma.Password_reset_requestsAggregateArgs
    >,
    options?: Omit<
        UseQueryOptions<TQueryFnData, TError, TData>,
        'queryKey'
    > &
        ExtraQueryOptions
) {
    const { endpoint, fetch } = getHooksContext()
    return useModelQuery<TQueryFnData, TData, TError>(
        'Password_reset_requests',
        `${endpoint}/password_reset_requests/aggregate`,
        args,
        options,
        fetch
    )
}

export function useSuspenseAggregatePassword_reset_requests<
    TArgs extends Prisma.Password_reset_requestsAggregateArgs,
    TQueryFnData = Prisma.GetPassword_reset_requestsAggregateType<TArgs>,
    TData = TQueryFnData,
    TError = DefaultError
>(
    args: Prisma.SelectSubset<
        TArgs,
        Prisma.Password_reset_requestsAggregateArgs
    >,
    options?: Omit<
        UseSuspenseQueryOptions<TQueryFnData, TError, TData>,
        'queryKey'
    > &
        ExtraQueryOptions
) {
    const { endpoint, fetch } = getHooksContext()
    return useSuspenseModelQuery<TQueryFnData, TData, TError>(
        'Password_reset_requests',
        `${endpoint}/password_reset_requests/aggregate`,
        args,
        options,
        fetch
    )
}

export function useGroupBypassword_reset_requests<
    TArgs extends Prisma.password_reset_requestsGroupByArgs,
    HasSelectOrTake extends Prisma.Or<
        Prisma.Extends<'skip', Prisma.Keys<TArgs>>,
        Prisma.Extends<'take', Prisma.Keys<TArgs>>
    >,
    OrderByArg extends Prisma.True extends HasSelectOrTake
        ? {
              orderBy: Prisma.password_reset_requestsGroupByArgs['orderBy']
          }
        : {
              orderBy?: Prisma.password_reset_requestsGroupByArgs['orderBy']
          },
    OrderFields extends Prisma.ExcludeUnderscoreKeys<
        Prisma.Keys<Prisma.MaybeTupleToUnion<TArgs['orderBy']>>
    >,
    ByFields extends Prisma.MaybeTupleToUnion<TArgs['by']>,
    ByValid extends Prisma.Has<ByFields, OrderFields>,
    HavingFields extends Prisma.GetHavingFields<TArgs['having']>,
    HavingValid extends Prisma.Has<ByFields, HavingFields>,
    ByEmpty extends TArgs['by'] extends never[]
        ? Prisma.True
        : Prisma.False,
    InputErrors extends ByEmpty extends Prisma.True
        ? `Error: "by" must not be empty.`
        : HavingValid extends Prisma.False
          ? {
                [P in HavingFields]: P extends ByFields
                    ? never
                    : P extends string
                      ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                      : [
                            Error,
                            'Field ',
                            P,
                            ` in "having" needs to be provided in "by"`
                        ]
            }[HavingFields]
          : 'take' extends Prisma.Keys<TArgs>
            ? 'orderBy' extends Prisma.Keys<TArgs>
                ? ByValid extends Prisma.True
                    ? {}
                    : {
                          [P in OrderFields]: P extends ByFields
                              ? never
                              : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
                      }[OrderFields]
                : 'Error: If you provide "take", you also need to provide "orderBy"'
            : 'skip' extends Prisma.Keys<TArgs>
              ? 'orderBy' extends Prisma.Keys<TArgs>
                  ? ByValid extends Prisma.True
                      ? {}
                      : {
                            [P in OrderFields]: P extends ByFields
                                ? never
                                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
                        }[OrderFields]
                  : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends Prisma.True
                ? {}
                : {
                      [P in OrderFields]: P extends ByFields
                          ? never
                          : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
                  }[OrderFields],
    TQueryFnData = {} extends InputErrors
        ? Array<
              PickEnumerable<
                  Prisma.Password_reset_requestsGroupByOutputType,
                  TArgs['by']
              > & {
                  [P in keyof TArgs &
                      keyof Prisma.Password_reset_requestsGroupByOutputType]: P extends '_count'
                      ? TArgs[P] extends boolean
                          ? number
                          : Prisma.GetScalarType<
                                TArgs[P],
                                Prisma.Password_reset_requestsGroupByOutputType[P]
                            >
                      : Prisma.GetScalarType<
                            TArgs[P],
                            Prisma.Password_reset_requestsGroupByOutputType[P]
                        >
              }
          >
        : InputErrors,
    TData = TQueryFnData,
    TError = DefaultError
>(
    args: Prisma.SelectSubset<
        TArgs,
        Prisma.SubsetIntersection<
            TArgs,
            Prisma.password_reset_requestsGroupByArgs,
            OrderByArg
        > &
            InputErrors
    >,
    options?: Omit<
        UseQueryOptions<TQueryFnData, TError, TData>,
        'queryKey'
    > &
        ExtraQueryOptions
) {
    const { endpoint, fetch } = getHooksContext()
    return useModelQuery<TQueryFnData, TData, TError>(
        'password_reset_requests',
        `${endpoint}/password_reset_requests/groupBy`,
        args,
        options,
        fetch
    )
}

export function useSuspenseGroupBypassword_reset_requests<
    TArgs extends Prisma.password_reset_requestsGroupByArgs,
    HasSelectOrTake extends Prisma.Or<
        Prisma.Extends<'skip', Prisma.Keys<TArgs>>,
        Prisma.Extends<'take', Prisma.Keys<TArgs>>
    >,
    OrderByArg extends Prisma.True extends HasSelectOrTake
        ? {
              orderBy: Prisma.password_reset_requestsGroupByArgs['orderBy']
          }
        : {
              orderBy?: Prisma.password_reset_requestsGroupByArgs['orderBy']
          },
    OrderFields extends Prisma.ExcludeUnderscoreKeys<
        Prisma.Keys<Prisma.MaybeTupleToUnion<TArgs['orderBy']>>
    >,
    ByFields extends Prisma.MaybeTupleToUnion<TArgs['by']>,
    ByValid extends Prisma.Has<ByFields, OrderFields>,
    HavingFields extends Prisma.GetHavingFields<TArgs['having']>,
    HavingValid extends Prisma.Has<ByFields, HavingFields>,
    ByEmpty extends TArgs['by'] extends never[]
        ? Prisma.True
        : Prisma.False,
    InputErrors extends ByEmpty extends Prisma.True
        ? `Error: "by" must not be empty.`
        : HavingValid extends Prisma.False
          ? {
                [P in HavingFields]: P extends ByFields
                    ? never
                    : P extends string
                      ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                      : [
                            Error,
                            'Field ',
                            P,
                            ` in "having" needs to be provided in "by"`
                        ]
            }[HavingFields]
          : 'take' extends Prisma.Keys<TArgs>
            ? 'orderBy' extends Prisma.Keys<TArgs>
                ? ByValid extends Prisma.True
                    ? {}
                    : {
                          [P in OrderFields]: P extends ByFields
                              ? never
                              : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
                      }[OrderFields]
                : 'Error: If you provide "take", you also need to provide "orderBy"'
            : 'skip' extends Prisma.Keys<TArgs>
              ? 'orderBy' extends Prisma.Keys<TArgs>
                  ? ByValid extends Prisma.True
                      ? {}
                      : {
                            [P in OrderFields]: P extends ByFields
                                ? never
                                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
                        }[OrderFields]
                  : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends Prisma.True
                ? {}
                : {
                      [P in OrderFields]: P extends ByFields
                          ? never
                          : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
                  }[OrderFields],
    TQueryFnData = {} extends InputErrors
        ? Array<
              PickEnumerable<
                  Prisma.Password_reset_requestsGroupByOutputType,
                  TArgs['by']
              > & {
                  [P in keyof TArgs &
                      keyof Prisma.Password_reset_requestsGroupByOutputType]: P extends '_count'
                      ? TArgs[P] extends boolean
                          ? number
                          : Prisma.GetScalarType<
                                TArgs[P],
                                Prisma.Password_reset_requestsGroupByOutputType[P]
                            >
                      : Prisma.GetScalarType<
                            TArgs[P],
                            Prisma.Password_reset_requestsGroupByOutputType[P]
                        >
              }
          >
        : InputErrors,
    TData = TQueryFnData,
    TError = DefaultError
>(
    args: Prisma.SelectSubset<
        TArgs,
        Prisma.SubsetIntersection<
            TArgs,
            Prisma.password_reset_requestsGroupByArgs,
            OrderByArg
        > &
            InputErrors
    >,
    options?: Omit<
        UseSuspenseQueryOptions<TQueryFnData, TError, TData>,
        'queryKey'
    > &
        ExtraQueryOptions
) {
    const { endpoint, fetch } = getHooksContext()
    return useSuspenseModelQuery<TQueryFnData, TData, TError>(
        'password_reset_requests',
        `${endpoint}/password_reset_requests/groupBy`,
        args,
        options,
        fetch
    )
}

export function useCountpassword_reset_requests<
    TArgs extends Prisma.password_reset_requestsCountArgs,
    TQueryFnData = TArgs extends { select: any }
        ? TArgs['select'] extends true
            ? number
            : Prisma.GetScalarType<
                  TArgs['select'],
                  Prisma.Password_reset_requestsCountAggregateOutputType
              >
        : number,
    TData = TQueryFnData,
    TError = DefaultError
>(
    args?: Prisma.SelectSubset<
        TArgs,
        Prisma.password_reset_requestsCountArgs
    >,
    options?: Omit<
        UseQueryOptions<TQueryFnData, TError, TData>,
        'queryKey'
    > &
        ExtraQueryOptions
) {
    const { endpoint, fetch } = getHooksContext()
    return useModelQuery<TQueryFnData, TData, TError>(
        'password_reset_requests',
        `${endpoint}/password_reset_requests/count`,
        args,
        options,
        fetch
    )
}

export function useSuspenseCountpassword_reset_requests<
    TArgs extends Prisma.password_reset_requestsCountArgs,
    TQueryFnData = TArgs extends { select: any }
        ? TArgs['select'] extends true
            ? number
            : Prisma.GetScalarType<
                  TArgs['select'],
                  Prisma.Password_reset_requestsCountAggregateOutputType
              >
        : number,
    TData = TQueryFnData,
    TError = DefaultError
>(
    args?: Prisma.SelectSubset<
        TArgs,
        Prisma.password_reset_requestsCountArgs
    >,
    options?: Omit<
        UseSuspenseQueryOptions<TQueryFnData, TError, TData>,
        'queryKey'
    > &
        ExtraQueryOptions
) {
    const { endpoint, fetch } = getHooksContext()
    return useSuspenseModelQuery<TQueryFnData, TData, TError>(
        'password_reset_requests',
        `${endpoint}/password_reset_requests/count`,
        args,
        options,
        fetch
    )
}

export function useCheckpassword_reset_requests<
    TError = DefaultError
>(
    args: {
        operation: PolicyCrudKind
        where?: { id?: string; user_id?: string; token?: string }
    },
    options?: Omit<
        UseQueryOptions<boolean, TError, boolean>,
        'queryKey'
    > &
        ExtraQueryOptions
) {
    const { endpoint, fetch } = getHooksContext()
    return useModelQuery<boolean, boolean, TError>(
        'password_reset_requests',
        `${endpoint}/password_reset_requests/check`,
        args,
        options,
        fetch
    )
}

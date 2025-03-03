/******************************************************************************
 * This file was generated by ZenStack CLI.
 ******************************************************************************/

/* eslint-disable */
// @ts-nocheck

import type { Prisma, subscriptions } from '@prisma/client'
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

export function useCreatesubscriptions(
    options?: Omit<
        UseMutationOptions<
            subscriptions | undefined,
            DefaultError,
            Prisma.subscriptionsCreateArgs
        > &
            ExtraMutationOptions,
        'mutationFn'
    >
) {
    const { endpoint, fetch } = getHooksContext()
    const _mutation = useModelMutation<
        Prisma.subscriptionsCreateArgs,
        DefaultError,
        subscriptions,
        true
    >(
        'subscriptions',
        'POST',
        `${endpoint}/subscriptions/create`,
        metadata,
        options,
        fetch,
        true
    )
    const mutation = {
        ..._mutation,
        mutateAsync: async <T extends Prisma.subscriptionsCreateArgs>(
            args: Prisma.SelectSubset<
                T,
                Prisma.subscriptionsCreateArgs
            >,
            options?: Omit<
                UseMutationOptions<
                    | CheckSelect<
                          T,
                          subscriptions,
                          Prisma.subscriptionsGetPayload<T>
                      >
                    | undefined,
                    DefaultError,
                    Prisma.SelectSubset<
                        T,
                        Prisma.subscriptionsCreateArgs
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
                      subscriptions,
                      Prisma.subscriptionsGetPayload<T>
                  >
                | undefined
        }
    }
    return mutation
}

export function useCreateManysubscriptions(
    options?: Omit<
        UseMutationOptions<
            Prisma.BatchPayload,
            DefaultError,
            Prisma.subscriptionsCreateManyArgs
        > &
            ExtraMutationOptions,
        'mutationFn'
    >
) {
    const { endpoint, fetch } = getHooksContext()
    const _mutation = useModelMutation<
        Prisma.subscriptionsCreateManyArgs,
        DefaultError,
        Prisma.BatchPayload,
        false
    >(
        'subscriptions',
        'POST',
        `${endpoint}/subscriptions/createMany`,
        metadata,
        options,
        fetch,
        false
    )
    const mutation = {
        ..._mutation,
        mutateAsync: async <
            T extends Prisma.subscriptionsCreateManyArgs
        >(
            args: Prisma.SelectSubset<
                T,
                Prisma.subscriptionsCreateManyArgs
            >,
            options?: Omit<
                UseMutationOptions<
                    Prisma.BatchPayload,
                    DefaultError,
                    Prisma.SelectSubset<
                        T,
                        Prisma.subscriptionsCreateManyArgs
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

export function useFindManysubscriptions<
    TArgs extends Prisma.subscriptionsFindManyArgs,
    TQueryFnData = Array<
        Prisma.subscriptionsGetPayload<TArgs> & {
            $optimistic?: boolean
        }
    >,
    TData = TQueryFnData,
    TError = DefaultError
>(
    args?: Prisma.SelectSubset<
        TArgs,
        Prisma.subscriptionsFindManyArgs
    >,
    options?: Omit<
        UseQueryOptions<TQueryFnData, TError, TData>,
        'queryKey'
    > &
        ExtraQueryOptions
) {
    const { endpoint, fetch } = getHooksContext()
    return useModelQuery<TQueryFnData, TData, TError>(
        'subscriptions',
        `${endpoint}/subscriptions/findMany`,
        args,
        options,
        fetch
    )
}

export function useInfiniteFindManysubscriptions<
    TArgs extends Prisma.subscriptionsFindManyArgs,
    TQueryFnData = Array<Prisma.subscriptionsGetPayload<TArgs>>,
    TData = TQueryFnData,
    TError = DefaultError
>(
    args?: Prisma.SelectSubset<
        TArgs,
        Prisma.subscriptionsFindManyArgs
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
        'subscriptions',
        `${endpoint}/subscriptions/findMany`,
        args,
        options,
        fetch
    )
}

export function useSuspenseFindManysubscriptions<
    TArgs extends Prisma.subscriptionsFindManyArgs,
    TQueryFnData = Array<
        Prisma.subscriptionsGetPayload<TArgs> & {
            $optimistic?: boolean
        }
    >,
    TData = TQueryFnData,
    TError = DefaultError
>(
    args?: Prisma.SelectSubset<
        TArgs,
        Prisma.subscriptionsFindManyArgs
    >,
    options?: Omit<
        UseSuspenseQueryOptions<TQueryFnData, TError, TData>,
        'queryKey'
    > &
        ExtraQueryOptions
) {
    const { endpoint, fetch } = getHooksContext()
    return useSuspenseModelQuery<TQueryFnData, TData, TError>(
        'subscriptions',
        `${endpoint}/subscriptions/findMany`,
        args,
        options,
        fetch
    )
}

export function useSuspenseInfiniteFindManysubscriptions<
    TArgs extends Prisma.subscriptionsFindManyArgs,
    TQueryFnData = Array<Prisma.subscriptionsGetPayload<TArgs>>,
    TData = TQueryFnData,
    TError = DefaultError
>(
    args?: Prisma.SelectSubset<
        TArgs,
        Prisma.subscriptionsFindManyArgs
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
        'subscriptions',
        `${endpoint}/subscriptions/findMany`,
        args,
        options,
        fetch
    )
}

export function useFindUniquesubscriptions<
    TArgs extends Prisma.subscriptionsFindUniqueArgs,
    TQueryFnData = Prisma.subscriptionsGetPayload<TArgs> & {
        $optimistic?: boolean
    },
    TData = TQueryFnData,
    TError = DefaultError
>(
    args: Prisma.SelectSubset<
        TArgs,
        Prisma.subscriptionsFindUniqueArgs
    >,
    options?: Omit<
        UseQueryOptions<TQueryFnData, TError, TData>,
        'queryKey'
    > &
        ExtraQueryOptions
) {
    const { endpoint, fetch } = getHooksContext()
    return useModelQuery<TQueryFnData, TData, TError>(
        'subscriptions',
        `${endpoint}/subscriptions/findUnique`,
        args,
        options,
        fetch
    )
}

export function useSuspenseFindUniquesubscriptions<
    TArgs extends Prisma.subscriptionsFindUniqueArgs,
    TQueryFnData = Prisma.subscriptionsGetPayload<TArgs> & {
        $optimistic?: boolean
    },
    TData = TQueryFnData,
    TError = DefaultError
>(
    args: Prisma.SelectSubset<
        TArgs,
        Prisma.subscriptionsFindUniqueArgs
    >,
    options?: Omit<
        UseSuspenseQueryOptions<TQueryFnData, TError, TData>,
        'queryKey'
    > &
        ExtraQueryOptions
) {
    const { endpoint, fetch } = getHooksContext()
    return useSuspenseModelQuery<TQueryFnData, TData, TError>(
        'subscriptions',
        `${endpoint}/subscriptions/findUnique`,
        args,
        options,
        fetch
    )
}

export function useFindFirstsubscriptions<
    TArgs extends Prisma.subscriptionsFindFirstArgs,
    TQueryFnData = Prisma.subscriptionsGetPayload<TArgs> & {
        $optimistic?: boolean
    },
    TData = TQueryFnData,
    TError = DefaultError
>(
    args?: Prisma.SelectSubset<
        TArgs,
        Prisma.subscriptionsFindFirstArgs
    >,
    options?: Omit<
        UseQueryOptions<TQueryFnData, TError, TData>,
        'queryKey'
    > &
        ExtraQueryOptions
) {
    const { endpoint, fetch } = getHooksContext()
    return useModelQuery<TQueryFnData, TData, TError>(
        'subscriptions',
        `${endpoint}/subscriptions/findFirst`,
        args,
        options,
        fetch
    )
}

export function useSuspenseFindFirstsubscriptions<
    TArgs extends Prisma.subscriptionsFindFirstArgs,
    TQueryFnData = Prisma.subscriptionsGetPayload<TArgs> & {
        $optimistic?: boolean
    },
    TData = TQueryFnData,
    TError = DefaultError
>(
    args?: Prisma.SelectSubset<
        TArgs,
        Prisma.subscriptionsFindFirstArgs
    >,
    options?: Omit<
        UseSuspenseQueryOptions<TQueryFnData, TError, TData>,
        'queryKey'
    > &
        ExtraQueryOptions
) {
    const { endpoint, fetch } = getHooksContext()
    return useSuspenseModelQuery<TQueryFnData, TData, TError>(
        'subscriptions',
        `${endpoint}/subscriptions/findFirst`,
        args,
        options,
        fetch
    )
}

export function useUpdatesubscriptions(
    options?: Omit<
        UseMutationOptions<
            subscriptions | undefined,
            DefaultError,
            Prisma.subscriptionsUpdateArgs
        > &
            ExtraMutationOptions,
        'mutationFn'
    >
) {
    const { endpoint, fetch } = getHooksContext()
    const _mutation = useModelMutation<
        Prisma.subscriptionsUpdateArgs,
        DefaultError,
        subscriptions,
        true
    >(
        'subscriptions',
        'PUT',
        `${endpoint}/subscriptions/update`,
        metadata,
        options,
        fetch,
        true
    )
    const mutation = {
        ..._mutation,
        mutateAsync: async <T extends Prisma.subscriptionsUpdateArgs>(
            args: Prisma.SelectSubset<
                T,
                Prisma.subscriptionsUpdateArgs
            >,
            options?: Omit<
                UseMutationOptions<
                    | CheckSelect<
                          T,
                          subscriptions,
                          Prisma.subscriptionsGetPayload<T>
                      >
                    | undefined,
                    DefaultError,
                    Prisma.SelectSubset<
                        T,
                        Prisma.subscriptionsUpdateArgs
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
                      subscriptions,
                      Prisma.subscriptionsGetPayload<T>
                  >
                | undefined
        }
    }
    return mutation
}

export function useUpdateManysubscriptions(
    options?: Omit<
        UseMutationOptions<
            Prisma.BatchPayload,
            DefaultError,
            Prisma.subscriptionsUpdateManyArgs
        > &
            ExtraMutationOptions,
        'mutationFn'
    >
) {
    const { endpoint, fetch } = getHooksContext()
    const _mutation = useModelMutation<
        Prisma.subscriptionsUpdateManyArgs,
        DefaultError,
        Prisma.BatchPayload,
        false
    >(
        'subscriptions',
        'PUT',
        `${endpoint}/subscriptions/updateMany`,
        metadata,
        options,
        fetch,
        false
    )
    const mutation = {
        ..._mutation,
        mutateAsync: async <
            T extends Prisma.subscriptionsUpdateManyArgs
        >(
            args: Prisma.SelectSubset<
                T,
                Prisma.subscriptionsUpdateManyArgs
            >,
            options?: Omit<
                UseMutationOptions<
                    Prisma.BatchPayload,
                    DefaultError,
                    Prisma.SelectSubset<
                        T,
                        Prisma.subscriptionsUpdateManyArgs
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

export function useUpsertsubscriptions(
    options?: Omit<
        UseMutationOptions<
            subscriptions | undefined,
            DefaultError,
            Prisma.subscriptionsUpsertArgs
        > &
            ExtraMutationOptions,
        'mutationFn'
    >
) {
    const { endpoint, fetch } = getHooksContext()
    const _mutation = useModelMutation<
        Prisma.subscriptionsUpsertArgs,
        DefaultError,
        subscriptions,
        true
    >(
        'subscriptions',
        'POST',
        `${endpoint}/subscriptions/upsert`,
        metadata,
        options,
        fetch,
        true
    )
    const mutation = {
        ..._mutation,
        mutateAsync: async <T extends Prisma.subscriptionsUpsertArgs>(
            args: Prisma.SelectSubset<
                T,
                Prisma.subscriptionsUpsertArgs
            >,
            options?: Omit<
                UseMutationOptions<
                    | CheckSelect<
                          T,
                          subscriptions,
                          Prisma.subscriptionsGetPayload<T>
                      >
                    | undefined,
                    DefaultError,
                    Prisma.SelectSubset<
                        T,
                        Prisma.subscriptionsUpsertArgs
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
                      subscriptions,
                      Prisma.subscriptionsGetPayload<T>
                  >
                | undefined
        }
    }
    return mutation
}

export function useDeletesubscriptions(
    options?: Omit<
        UseMutationOptions<
            subscriptions | undefined,
            DefaultError,
            Prisma.subscriptionsDeleteArgs
        > &
            ExtraMutationOptions,
        'mutationFn'
    >
) {
    const { endpoint, fetch } = getHooksContext()
    const _mutation = useModelMutation<
        Prisma.subscriptionsDeleteArgs,
        DefaultError,
        subscriptions,
        true
    >(
        'subscriptions',
        'DELETE',
        `${endpoint}/subscriptions/delete`,
        metadata,
        options,
        fetch,
        true
    )
    const mutation = {
        ..._mutation,
        mutateAsync: async <T extends Prisma.subscriptionsDeleteArgs>(
            args: Prisma.SelectSubset<
                T,
                Prisma.subscriptionsDeleteArgs
            >,
            options?: Omit<
                UseMutationOptions<
                    | CheckSelect<
                          T,
                          subscriptions,
                          Prisma.subscriptionsGetPayload<T>
                      >
                    | undefined,
                    DefaultError,
                    Prisma.SelectSubset<
                        T,
                        Prisma.subscriptionsDeleteArgs
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
                      subscriptions,
                      Prisma.subscriptionsGetPayload<T>
                  >
                | undefined
        }
    }
    return mutation
}

export function useDeleteManysubscriptions(
    options?: Omit<
        UseMutationOptions<
            Prisma.BatchPayload,
            DefaultError,
            Prisma.subscriptionsDeleteManyArgs
        > &
            ExtraMutationOptions,
        'mutationFn'
    >
) {
    const { endpoint, fetch } = getHooksContext()
    const _mutation = useModelMutation<
        Prisma.subscriptionsDeleteManyArgs,
        DefaultError,
        Prisma.BatchPayload,
        false
    >(
        'subscriptions',
        'DELETE',
        `${endpoint}/subscriptions/deleteMany`,
        metadata,
        options,
        fetch,
        false
    )
    const mutation = {
        ..._mutation,
        mutateAsync: async <
            T extends Prisma.subscriptionsDeleteManyArgs
        >(
            args: Prisma.SelectSubset<
                T,
                Prisma.subscriptionsDeleteManyArgs
            >,
            options?: Omit<
                UseMutationOptions<
                    Prisma.BatchPayload,
                    DefaultError,
                    Prisma.SelectSubset<
                        T,
                        Prisma.subscriptionsDeleteManyArgs
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

export function useAggregateSubscriptions<
    TArgs extends Prisma.SubscriptionsAggregateArgs,
    TQueryFnData = Prisma.GetSubscriptionsAggregateType<TArgs>,
    TData = TQueryFnData,
    TError = DefaultError
>(
    args: Prisma.SelectSubset<
        TArgs,
        Prisma.SubscriptionsAggregateArgs
    >,
    options?: Omit<
        UseQueryOptions<TQueryFnData, TError, TData>,
        'queryKey'
    > &
        ExtraQueryOptions
) {
    const { endpoint, fetch } = getHooksContext()
    return useModelQuery<TQueryFnData, TData, TError>(
        'Subscriptions',
        `${endpoint}/subscriptions/aggregate`,
        args,
        options,
        fetch
    )
}

export function useSuspenseAggregateSubscriptions<
    TArgs extends Prisma.SubscriptionsAggregateArgs,
    TQueryFnData = Prisma.GetSubscriptionsAggregateType<TArgs>,
    TData = TQueryFnData,
    TError = DefaultError
>(
    args: Prisma.SelectSubset<
        TArgs,
        Prisma.SubscriptionsAggregateArgs
    >,
    options?: Omit<
        UseSuspenseQueryOptions<TQueryFnData, TError, TData>,
        'queryKey'
    > &
        ExtraQueryOptions
) {
    const { endpoint, fetch } = getHooksContext()
    return useSuspenseModelQuery<TQueryFnData, TData, TError>(
        'Subscriptions',
        `${endpoint}/subscriptions/aggregate`,
        args,
        options,
        fetch
    )
}

export function useGroupBysubscriptions<
    TArgs extends Prisma.subscriptionsGroupByArgs,
    HasSelectOrTake extends Prisma.Or<
        Prisma.Extends<'skip', Prisma.Keys<TArgs>>,
        Prisma.Extends<'take', Prisma.Keys<TArgs>>
    >,
    OrderByArg extends Prisma.True extends HasSelectOrTake
        ? { orderBy: Prisma.subscriptionsGroupByArgs['orderBy'] }
        : { orderBy?: Prisma.subscriptionsGroupByArgs['orderBy'] },
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
                  Prisma.SubscriptionsGroupByOutputType,
                  TArgs['by']
              > & {
                  [P in keyof TArgs &
                      keyof Prisma.SubscriptionsGroupByOutputType]: P extends '_count'
                      ? TArgs[P] extends boolean
                          ? number
                          : Prisma.GetScalarType<
                                TArgs[P],
                                Prisma.SubscriptionsGroupByOutputType[P]
                            >
                      : Prisma.GetScalarType<
                            TArgs[P],
                            Prisma.SubscriptionsGroupByOutputType[P]
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
            Prisma.subscriptionsGroupByArgs,
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
        'subscriptions',
        `${endpoint}/subscriptions/groupBy`,
        args,
        options,
        fetch
    )
}

export function useSuspenseGroupBysubscriptions<
    TArgs extends Prisma.subscriptionsGroupByArgs,
    HasSelectOrTake extends Prisma.Or<
        Prisma.Extends<'skip', Prisma.Keys<TArgs>>,
        Prisma.Extends<'take', Prisma.Keys<TArgs>>
    >,
    OrderByArg extends Prisma.True extends HasSelectOrTake
        ? { orderBy: Prisma.subscriptionsGroupByArgs['orderBy'] }
        : { orderBy?: Prisma.subscriptionsGroupByArgs['orderBy'] },
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
                  Prisma.SubscriptionsGroupByOutputType,
                  TArgs['by']
              > & {
                  [P in keyof TArgs &
                      keyof Prisma.SubscriptionsGroupByOutputType]: P extends '_count'
                      ? TArgs[P] extends boolean
                          ? number
                          : Prisma.GetScalarType<
                                TArgs[P],
                                Prisma.SubscriptionsGroupByOutputType[P]
                            >
                      : Prisma.GetScalarType<
                            TArgs[P],
                            Prisma.SubscriptionsGroupByOutputType[P]
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
            Prisma.subscriptionsGroupByArgs,
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
        'subscriptions',
        `${endpoint}/subscriptions/groupBy`,
        args,
        options,
        fetch
    )
}

export function useCountsubscriptions<
    TArgs extends Prisma.subscriptionsCountArgs,
    TQueryFnData = TArgs extends { select: any }
        ? TArgs['select'] extends true
            ? number
            : Prisma.GetScalarType<
                  TArgs['select'],
                  Prisma.SubscriptionsCountAggregateOutputType
              >
        : number,
    TData = TQueryFnData,
    TError = DefaultError
>(
    args?: Prisma.SelectSubset<TArgs, Prisma.subscriptionsCountArgs>,
    options?: Omit<
        UseQueryOptions<TQueryFnData, TError, TData>,
        'queryKey'
    > &
        ExtraQueryOptions
) {
    const { endpoint, fetch } = getHooksContext()
    return useModelQuery<TQueryFnData, TData, TError>(
        'subscriptions',
        `${endpoint}/subscriptions/count`,
        args,
        options,
        fetch
    )
}

export function useSuspenseCountsubscriptions<
    TArgs extends Prisma.subscriptionsCountArgs,
    TQueryFnData = TArgs extends { select: any }
        ? TArgs['select'] extends true
            ? number
            : Prisma.GetScalarType<
                  TArgs['select'],
                  Prisma.SubscriptionsCountAggregateOutputType
              >
        : number,
    TData = TQueryFnData,
    TError = DefaultError
>(
    args?: Prisma.SelectSubset<TArgs, Prisma.subscriptionsCountArgs>,
    options?: Omit<
        UseSuspenseQueryOptions<TQueryFnData, TError, TData>,
        'queryKey'
    > &
        ExtraQueryOptions
) {
    const { endpoint, fetch } = getHooksContext()
    return useSuspenseModelQuery<TQueryFnData, TData, TError>(
        'subscriptions',
        `${endpoint}/subscriptions/count`,
        args,
        options,
        fetch
    )
}

export function useChecksubscriptions<TError = DefaultError>(
    args: {
        operation: PolicyCrudKind
        where?: {
            id?: string
            user_id?: string
            product_id?: string
            subscription_status?: string
            subscription_type?: string
            stripe_subscription_id?: string
            stripe_customer_id?: string
            stripe_product_id?: string
            stripe_price_id?: string
            stripe_price_currency?: string
            stripe_price_interval?: string
            stripe_price_usage_type?: string
        }
    },
    options?: Omit<
        UseQueryOptions<boolean, TError, boolean>,
        'queryKey'
    > &
        ExtraQueryOptions
) {
    const { endpoint, fetch } = getHooksContext()
    return useModelQuery<boolean, boolean, TError>(
        'subscriptions',
        `${endpoint}/subscriptions/check`,
        args,
        options,
        fetch
    )
}

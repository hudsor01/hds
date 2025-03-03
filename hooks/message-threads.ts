/******************************************************************************
 * This file was generated by ZenStack CLI.
 ******************************************************************************/

/* eslint-disable */
// @ts-nocheck

import type { Prisma, message_threads } from '@prisma/client'
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

export function useCreatemessage_threads(
    options?: Omit<
        UseMutationOptions<
            message_threads | undefined,
            DefaultError,
            Prisma.message_threadsCreateArgs
        > &
            ExtraMutationOptions,
        'mutationFn'
    >
) {
    const { endpoint, fetch } = getHooksContext()
    const _mutation = useModelMutation<
        Prisma.message_threadsCreateArgs,
        DefaultError,
        message_threads,
        true
    >(
        'message_threads',
        'POST',
        `${endpoint}/message_threads/create`,
        metadata,
        options,
        fetch,
        true
    )
    const mutation = {
        ..._mutation,
        mutateAsync: async <
            T extends Prisma.message_threadsCreateArgs
        >(
            args: Prisma.SelectSubset<
                T,
                Prisma.message_threadsCreateArgs
            >,
            options?: Omit<
                UseMutationOptions<
                    | CheckSelect<
                          T,
                          message_threads,
                          Prisma.message_threadsGetPayload<T>
                      >
                    | undefined,
                    DefaultError,
                    Prisma.SelectSubset<
                        T,
                        Prisma.message_threadsCreateArgs
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
                      message_threads,
                      Prisma.message_threadsGetPayload<T>
                  >
                | undefined
        }
    }
    return mutation
}

export function useCreateManymessage_threads(
    options?: Omit<
        UseMutationOptions<
            Prisma.BatchPayload,
            DefaultError,
            Prisma.message_threadsCreateManyArgs
        > &
            ExtraMutationOptions,
        'mutationFn'
    >
) {
    const { endpoint, fetch } = getHooksContext()
    const _mutation = useModelMutation<
        Prisma.message_threadsCreateManyArgs,
        DefaultError,
        Prisma.BatchPayload,
        false
    >(
        'message_threads',
        'POST',
        `${endpoint}/message_threads/createMany`,
        metadata,
        options,
        fetch,
        false
    )
    const mutation = {
        ..._mutation,
        mutateAsync: async <
            T extends Prisma.message_threadsCreateManyArgs
        >(
            args: Prisma.SelectSubset<
                T,
                Prisma.message_threadsCreateManyArgs
            >,
            options?: Omit<
                UseMutationOptions<
                    Prisma.BatchPayload,
                    DefaultError,
                    Prisma.SelectSubset<
                        T,
                        Prisma.message_threadsCreateManyArgs
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

export function useFindManymessage_threads<
    TArgs extends Prisma.message_threadsFindManyArgs,
    TQueryFnData = Array<
        Prisma.message_threadsGetPayload<TArgs> & {
            $optimistic?: boolean
        }
    >,
    TData = TQueryFnData,
    TError = DefaultError
>(
    args?: Prisma.SelectSubset<
        TArgs,
        Prisma.message_threadsFindManyArgs
    >,
    options?: Omit<
        UseQueryOptions<TQueryFnData, TError, TData>,
        'queryKey'
    > &
        ExtraQueryOptions
) {
    const { endpoint, fetch } = getHooksContext()
    return useModelQuery<TQueryFnData, TData, TError>(
        'message_threads',
        `${endpoint}/message_threads/findMany`,
        args,
        options,
        fetch
    )
}

export function useInfiniteFindManymessage_threads<
    TArgs extends Prisma.message_threadsFindManyArgs,
    TQueryFnData = Array<Prisma.message_threadsGetPayload<TArgs>>,
    TData = TQueryFnData,
    TError = DefaultError
>(
    args?: Prisma.SelectSubset<
        TArgs,
        Prisma.message_threadsFindManyArgs
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
        'message_threads',
        `${endpoint}/message_threads/findMany`,
        args,
        options,
        fetch
    )
}

export function useSuspenseFindManymessage_threads<
    TArgs extends Prisma.message_threadsFindManyArgs,
    TQueryFnData = Array<
        Prisma.message_threadsGetPayload<TArgs> & {
            $optimistic?: boolean
        }
    >,
    TData = TQueryFnData,
    TError = DefaultError
>(
    args?: Prisma.SelectSubset<
        TArgs,
        Prisma.message_threadsFindManyArgs
    >,
    options?: Omit<
        UseSuspenseQueryOptions<TQueryFnData, TError, TData>,
        'queryKey'
    > &
        ExtraQueryOptions
) {
    const { endpoint, fetch } = getHooksContext()
    return useSuspenseModelQuery<TQueryFnData, TData, TError>(
        'message_threads',
        `${endpoint}/message_threads/findMany`,
        args,
        options,
        fetch
    )
}

export function useSuspenseInfiniteFindManymessage_threads<
    TArgs extends Prisma.message_threadsFindManyArgs,
    TQueryFnData = Array<Prisma.message_threadsGetPayload<TArgs>>,
    TData = TQueryFnData,
    TError = DefaultError
>(
    args?: Prisma.SelectSubset<
        TArgs,
        Prisma.message_threadsFindManyArgs
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
        'message_threads',
        `${endpoint}/message_threads/findMany`,
        args,
        options,
        fetch
    )
}

export function useFindUniquemessage_threads<
    TArgs extends Prisma.message_threadsFindUniqueArgs,
    TQueryFnData = Prisma.message_threadsGetPayload<TArgs> & {
        $optimistic?: boolean
    },
    TData = TQueryFnData,
    TError = DefaultError
>(
    args: Prisma.SelectSubset<
        TArgs,
        Prisma.message_threadsFindUniqueArgs
    >,
    options?: Omit<
        UseQueryOptions<TQueryFnData, TError, TData>,
        'queryKey'
    > &
        ExtraQueryOptions
) {
    const { endpoint, fetch } = getHooksContext()
    return useModelQuery<TQueryFnData, TData, TError>(
        'message_threads',
        `${endpoint}/message_threads/findUnique`,
        args,
        options,
        fetch
    )
}

export function useSuspenseFindUniquemessage_threads<
    TArgs extends Prisma.message_threadsFindUniqueArgs,
    TQueryFnData = Prisma.message_threadsGetPayload<TArgs> & {
        $optimistic?: boolean
    },
    TData = TQueryFnData,
    TError = DefaultError
>(
    args: Prisma.SelectSubset<
        TArgs,
        Prisma.message_threadsFindUniqueArgs
    >,
    options?: Omit<
        UseSuspenseQueryOptions<TQueryFnData, TError, TData>,
        'queryKey'
    > &
        ExtraQueryOptions
) {
    const { endpoint, fetch } = getHooksContext()
    return useSuspenseModelQuery<TQueryFnData, TData, TError>(
        'message_threads',
        `${endpoint}/message_threads/findUnique`,
        args,
        options,
        fetch
    )
}

export function useFindFirstmessage_threads<
    TArgs extends Prisma.message_threadsFindFirstArgs,
    TQueryFnData = Prisma.message_threadsGetPayload<TArgs> & {
        $optimistic?: boolean
    },
    TData = TQueryFnData,
    TError = DefaultError
>(
    args?: Prisma.SelectSubset<
        TArgs,
        Prisma.message_threadsFindFirstArgs
    >,
    options?: Omit<
        UseQueryOptions<TQueryFnData, TError, TData>,
        'queryKey'
    > &
        ExtraQueryOptions
) {
    const { endpoint, fetch } = getHooksContext()
    return useModelQuery<TQueryFnData, TData, TError>(
        'message_threads',
        `${endpoint}/message_threads/findFirst`,
        args,
        options,
        fetch
    )
}

export function useSuspenseFindFirstmessage_threads<
    TArgs extends Prisma.message_threadsFindFirstArgs,
    TQueryFnData = Prisma.message_threadsGetPayload<TArgs> & {
        $optimistic?: boolean
    },
    TData = TQueryFnData,
    TError = DefaultError
>(
    args?: Prisma.SelectSubset<
        TArgs,
        Prisma.message_threadsFindFirstArgs
    >,
    options?: Omit<
        UseSuspenseQueryOptions<TQueryFnData, TError, TData>,
        'queryKey'
    > &
        ExtraQueryOptions
) {
    const { endpoint, fetch } = getHooksContext()
    return useSuspenseModelQuery<TQueryFnData, TData, TError>(
        'message_threads',
        `${endpoint}/message_threads/findFirst`,
        args,
        options,
        fetch
    )
}

export function useUpdatemessage_threads(
    options?: Omit<
        UseMutationOptions<
            message_threads | undefined,
            DefaultError,
            Prisma.message_threadsUpdateArgs
        > &
            ExtraMutationOptions,
        'mutationFn'
    >
) {
    const { endpoint, fetch } = getHooksContext()
    const _mutation = useModelMutation<
        Prisma.message_threadsUpdateArgs,
        DefaultError,
        message_threads,
        true
    >(
        'message_threads',
        'PUT',
        `${endpoint}/message_threads/update`,
        metadata,
        options,
        fetch,
        true
    )
    const mutation = {
        ..._mutation,
        mutateAsync: async <
            T extends Prisma.message_threadsUpdateArgs
        >(
            args: Prisma.SelectSubset<
                T,
                Prisma.message_threadsUpdateArgs
            >,
            options?: Omit<
                UseMutationOptions<
                    | CheckSelect<
                          T,
                          message_threads,
                          Prisma.message_threadsGetPayload<T>
                      >
                    | undefined,
                    DefaultError,
                    Prisma.SelectSubset<
                        T,
                        Prisma.message_threadsUpdateArgs
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
                      message_threads,
                      Prisma.message_threadsGetPayload<T>
                  >
                | undefined
        }
    }
    return mutation
}

export function useUpdateManymessage_threads(
    options?: Omit<
        UseMutationOptions<
            Prisma.BatchPayload,
            DefaultError,
            Prisma.message_threadsUpdateManyArgs
        > &
            ExtraMutationOptions,
        'mutationFn'
    >
) {
    const { endpoint, fetch } = getHooksContext()
    const _mutation = useModelMutation<
        Prisma.message_threadsUpdateManyArgs,
        DefaultError,
        Prisma.BatchPayload,
        false
    >(
        'message_threads',
        'PUT',
        `${endpoint}/message_threads/updateMany`,
        metadata,
        options,
        fetch,
        false
    )
    const mutation = {
        ..._mutation,
        mutateAsync: async <
            T extends Prisma.message_threadsUpdateManyArgs
        >(
            args: Prisma.SelectSubset<
                T,
                Prisma.message_threadsUpdateManyArgs
            >,
            options?: Omit<
                UseMutationOptions<
                    Prisma.BatchPayload,
                    DefaultError,
                    Prisma.SelectSubset<
                        T,
                        Prisma.message_threadsUpdateManyArgs
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

export function useUpsertmessage_threads(
    options?: Omit<
        UseMutationOptions<
            message_threads | undefined,
            DefaultError,
            Prisma.message_threadsUpsertArgs
        > &
            ExtraMutationOptions,
        'mutationFn'
    >
) {
    const { endpoint, fetch } = getHooksContext()
    const _mutation = useModelMutation<
        Prisma.message_threadsUpsertArgs,
        DefaultError,
        message_threads,
        true
    >(
        'message_threads',
        'POST',
        `${endpoint}/message_threads/upsert`,
        metadata,
        options,
        fetch,
        true
    )
    const mutation = {
        ..._mutation,
        mutateAsync: async <
            T extends Prisma.message_threadsUpsertArgs
        >(
            args: Prisma.SelectSubset<
                T,
                Prisma.message_threadsUpsertArgs
            >,
            options?: Omit<
                UseMutationOptions<
                    | CheckSelect<
                          T,
                          message_threads,
                          Prisma.message_threadsGetPayload<T>
                      >
                    | undefined,
                    DefaultError,
                    Prisma.SelectSubset<
                        T,
                        Prisma.message_threadsUpsertArgs
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
                      message_threads,
                      Prisma.message_threadsGetPayload<T>
                  >
                | undefined
        }
    }
    return mutation
}

export function useDeletemessage_threads(
    options?: Omit<
        UseMutationOptions<
            message_threads | undefined,
            DefaultError,
            Prisma.message_threadsDeleteArgs
        > &
            ExtraMutationOptions,
        'mutationFn'
    >
) {
    const { endpoint, fetch } = getHooksContext()
    const _mutation = useModelMutation<
        Prisma.message_threadsDeleteArgs,
        DefaultError,
        message_threads,
        true
    >(
        'message_threads',
        'DELETE',
        `${endpoint}/message_threads/delete`,
        metadata,
        options,
        fetch,
        true
    )
    const mutation = {
        ..._mutation,
        mutateAsync: async <
            T extends Prisma.message_threadsDeleteArgs
        >(
            args: Prisma.SelectSubset<
                T,
                Prisma.message_threadsDeleteArgs
            >,
            options?: Omit<
                UseMutationOptions<
                    | CheckSelect<
                          T,
                          message_threads,
                          Prisma.message_threadsGetPayload<T>
                      >
                    | undefined,
                    DefaultError,
                    Prisma.SelectSubset<
                        T,
                        Prisma.message_threadsDeleteArgs
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
                      message_threads,
                      Prisma.message_threadsGetPayload<T>
                  >
                | undefined
        }
    }
    return mutation
}

export function useDeleteManymessage_threads(
    options?: Omit<
        UseMutationOptions<
            Prisma.BatchPayload,
            DefaultError,
            Prisma.message_threadsDeleteManyArgs
        > &
            ExtraMutationOptions,
        'mutationFn'
    >
) {
    const { endpoint, fetch } = getHooksContext()
    const _mutation = useModelMutation<
        Prisma.message_threadsDeleteManyArgs,
        DefaultError,
        Prisma.BatchPayload,
        false
    >(
        'message_threads',
        'DELETE',
        `${endpoint}/message_threads/deleteMany`,
        metadata,
        options,
        fetch,
        false
    )
    const mutation = {
        ..._mutation,
        mutateAsync: async <
            T extends Prisma.message_threadsDeleteManyArgs
        >(
            args: Prisma.SelectSubset<
                T,
                Prisma.message_threadsDeleteManyArgs
            >,
            options?: Omit<
                UseMutationOptions<
                    Prisma.BatchPayload,
                    DefaultError,
                    Prisma.SelectSubset<
                        T,
                        Prisma.message_threadsDeleteManyArgs
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

export function useAggregateMessage_threads<
    TArgs extends Prisma.Message_threadsAggregateArgs,
    TQueryFnData = Prisma.GetMessage_threadsAggregateType<TArgs>,
    TData = TQueryFnData,
    TError = DefaultError
>(
    args: Prisma.SelectSubset<
        TArgs,
        Prisma.Message_threadsAggregateArgs
    >,
    options?: Omit<
        UseQueryOptions<TQueryFnData, TError, TData>,
        'queryKey'
    > &
        ExtraQueryOptions
) {
    const { endpoint, fetch } = getHooksContext()
    return useModelQuery<TQueryFnData, TData, TError>(
        'Message_threads',
        `${endpoint}/message_threads/aggregate`,
        args,
        options,
        fetch
    )
}

export function useSuspenseAggregateMessage_threads<
    TArgs extends Prisma.Message_threadsAggregateArgs,
    TQueryFnData = Prisma.GetMessage_threadsAggregateType<TArgs>,
    TData = TQueryFnData,
    TError = DefaultError
>(
    args: Prisma.SelectSubset<
        TArgs,
        Prisma.Message_threadsAggregateArgs
    >,
    options?: Omit<
        UseSuspenseQueryOptions<TQueryFnData, TError, TData>,
        'queryKey'
    > &
        ExtraQueryOptions
) {
    const { endpoint, fetch } = getHooksContext()
    return useSuspenseModelQuery<TQueryFnData, TData, TError>(
        'Message_threads',
        `${endpoint}/message_threads/aggregate`,
        args,
        options,
        fetch
    )
}

export function useGroupBymessage_threads<
    TArgs extends Prisma.message_threadsGroupByArgs,
    HasSelectOrTake extends Prisma.Or<
        Prisma.Extends<'skip', Prisma.Keys<TArgs>>,
        Prisma.Extends<'take', Prisma.Keys<TArgs>>
    >,
    OrderByArg extends Prisma.True extends HasSelectOrTake
        ? { orderBy: Prisma.message_threadsGroupByArgs['orderBy'] }
        : { orderBy?: Prisma.message_threadsGroupByArgs['orderBy'] },
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
                  Prisma.Message_threadsGroupByOutputType,
                  TArgs['by']
              > & {
                  [P in keyof TArgs &
                      keyof Prisma.Message_threadsGroupByOutputType]: P extends '_count'
                      ? TArgs[P] extends boolean
                          ? number
                          : Prisma.GetScalarType<
                                TArgs[P],
                                Prisma.Message_threadsGroupByOutputType[P]
                            >
                      : Prisma.GetScalarType<
                            TArgs[P],
                            Prisma.Message_threadsGroupByOutputType[P]
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
            Prisma.message_threadsGroupByArgs,
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
        'message_threads',
        `${endpoint}/message_threads/groupBy`,
        args,
        options,
        fetch
    )
}

export function useSuspenseGroupBymessage_threads<
    TArgs extends Prisma.message_threadsGroupByArgs,
    HasSelectOrTake extends Prisma.Or<
        Prisma.Extends<'skip', Prisma.Keys<TArgs>>,
        Prisma.Extends<'take', Prisma.Keys<TArgs>>
    >,
    OrderByArg extends Prisma.True extends HasSelectOrTake
        ? { orderBy: Prisma.message_threadsGroupByArgs['orderBy'] }
        : { orderBy?: Prisma.message_threadsGroupByArgs['orderBy'] },
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
                  Prisma.Message_threadsGroupByOutputType,
                  TArgs['by']
              > & {
                  [P in keyof TArgs &
                      keyof Prisma.Message_threadsGroupByOutputType]: P extends '_count'
                      ? TArgs[P] extends boolean
                          ? number
                          : Prisma.GetScalarType<
                                TArgs[P],
                                Prisma.Message_threadsGroupByOutputType[P]
                            >
                      : Prisma.GetScalarType<
                            TArgs[P],
                            Prisma.Message_threadsGroupByOutputType[P]
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
            Prisma.message_threadsGroupByArgs,
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
        'message_threads',
        `${endpoint}/message_threads/groupBy`,
        args,
        options,
        fetch
    )
}

export function useCountmessage_threads<
    TArgs extends Prisma.message_threadsCountArgs,
    TQueryFnData = TArgs extends { select: any }
        ? TArgs['select'] extends true
            ? number
            : Prisma.GetScalarType<
                  TArgs['select'],
                  Prisma.Message_threadsCountAggregateOutputType
              >
        : number,
    TData = TQueryFnData,
    TError = DefaultError
>(
    args?: Prisma.SelectSubset<
        TArgs,
        Prisma.message_threadsCountArgs
    >,
    options?: Omit<
        UseQueryOptions<TQueryFnData, TError, TData>,
        'queryKey'
    > &
        ExtraQueryOptions
) {
    const { endpoint, fetch } = getHooksContext()
    return useModelQuery<TQueryFnData, TData, TError>(
        'message_threads',
        `${endpoint}/message_threads/count`,
        args,
        options,
        fetch
    )
}

export function useSuspenseCountmessage_threads<
    TArgs extends Prisma.message_threadsCountArgs,
    TQueryFnData = TArgs extends { select: any }
        ? TArgs['select'] extends true
            ? number
            : Prisma.GetScalarType<
                  TArgs['select'],
                  Prisma.Message_threadsCountAggregateOutputType
              >
        : number,
    TData = TQueryFnData,
    TError = DefaultError
>(
    args?: Prisma.SelectSubset<
        TArgs,
        Prisma.message_threadsCountArgs
    >,
    options?: Omit<
        UseSuspenseQueryOptions<TQueryFnData, TError, TData>,
        'queryKey'
    > &
        ExtraQueryOptions
) {
    const { endpoint, fetch } = getHooksContext()
    return useSuspenseModelQuery<TQueryFnData, TData, TError>(
        'message_threads',
        `${endpoint}/message_threads/count`,
        args,
        options,
        fetch
    )
}

export function useCheckmessage_threads<TError = DefaultError>(
    args: {
        operation: PolicyCrudKind
        where?: {
            id?: string
            subject?: string
            last_message_id?: string
            participants?: string
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
        'message_threads',
        `${endpoint}/message_threads/check`,
        args,
        options,
        fetch
    )
}

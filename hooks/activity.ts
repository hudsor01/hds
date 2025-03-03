/******************************************************************************
 * This file was generated by ZenStack CLI.
 ******************************************************************************/

/* eslint-disable */
// @ts-nocheck

import type { Prisma, activity } from '@prisma/client'
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

export function useCreateactivity(
    options?: Omit<
        UseMutationOptions<
            activity | undefined,
            DefaultError,
            Prisma.activityCreateArgs
        > &
            ExtraMutationOptions,
        'mutationFn'
    >
) {
    const { endpoint, fetch } = getHooksContext()
    const _mutation = useModelMutation<
        Prisma.activityCreateArgs,
        DefaultError,
        activity,
        true
    >(
        'activity',
        'POST',
        `${endpoint}/activity/create`,
        metadata,
        options,
        fetch,
        true
    )
    const mutation = {
        ..._mutation,
        mutateAsync: async <T extends Prisma.activityCreateArgs>(
            args: Prisma.SelectSubset<T, Prisma.activityCreateArgs>,
            options?: Omit<
                UseMutationOptions<
                    | CheckSelect<
                          T,
                          activity,
                          Prisma.activityGetPayload<T>
                      >
                    | undefined,
                    DefaultError,
                    Prisma.SelectSubset<T, Prisma.activityCreateArgs>
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
                      activity,
                      Prisma.activityGetPayload<T>
                  >
                | undefined
        }
    }
    return mutation
}

export function useCreateManyactivity(
    options?: Omit<
        UseMutationOptions<
            Prisma.BatchPayload,
            DefaultError,
            Prisma.activityCreateManyArgs
        > &
            ExtraMutationOptions,
        'mutationFn'
    >
) {
    const { endpoint, fetch } = getHooksContext()
    const _mutation = useModelMutation<
        Prisma.activityCreateManyArgs,
        DefaultError,
        Prisma.BatchPayload,
        false
    >(
        'activity',
        'POST',
        `${endpoint}/activity/createMany`,
        metadata,
        options,
        fetch,
        false
    )
    const mutation = {
        ..._mutation,
        mutateAsync: async <T extends Prisma.activityCreateManyArgs>(
            args: Prisma.SelectSubset<
                T,
                Prisma.activityCreateManyArgs
            >,
            options?: Omit<
                UseMutationOptions<
                    Prisma.BatchPayload,
                    DefaultError,
                    Prisma.SelectSubset<
                        T,
                        Prisma.activityCreateManyArgs
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

export function useFindManyactivity<
    TArgs extends Prisma.activityFindManyArgs,
    TQueryFnData = Array<
        Prisma.activityGetPayload<TArgs> & { $optimistic?: boolean }
    >,
    TData = TQueryFnData,
    TError = DefaultError
>(
    args?: Prisma.SelectSubset<TArgs, Prisma.activityFindManyArgs>,
    options?: Omit<
        UseQueryOptions<TQueryFnData, TError, TData>,
        'queryKey'
    > &
        ExtraQueryOptions
) {
    const { endpoint, fetch } = getHooksContext()
    return useModelQuery<TQueryFnData, TData, TError>(
        'activity',
        `${endpoint}/activity/findMany`,
        args,
        options,
        fetch
    )
}

export function useInfiniteFindManyactivity<
    TArgs extends Prisma.activityFindManyArgs,
    TQueryFnData = Array<Prisma.activityGetPayload<TArgs>>,
    TData = TQueryFnData,
    TError = DefaultError
>(
    args?: Prisma.SelectSubset<TArgs, Prisma.activityFindManyArgs>,
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
        'activity',
        `${endpoint}/activity/findMany`,
        args,
        options,
        fetch
    )
}

export function useSuspenseFindManyactivity<
    TArgs extends Prisma.activityFindManyArgs,
    TQueryFnData = Array<
        Prisma.activityGetPayload<TArgs> & { $optimistic?: boolean }
    >,
    TData = TQueryFnData,
    TError = DefaultError
>(
    args?: Prisma.SelectSubset<TArgs, Prisma.activityFindManyArgs>,
    options?: Omit<
        UseSuspenseQueryOptions<TQueryFnData, TError, TData>,
        'queryKey'
    > &
        ExtraQueryOptions
) {
    const { endpoint, fetch } = getHooksContext()
    return useSuspenseModelQuery<TQueryFnData, TData, TError>(
        'activity',
        `${endpoint}/activity/findMany`,
        args,
        options,
        fetch
    )
}

export function useSuspenseInfiniteFindManyactivity<
    TArgs extends Prisma.activityFindManyArgs,
    TQueryFnData = Array<Prisma.activityGetPayload<TArgs>>,
    TData = TQueryFnData,
    TError = DefaultError
>(
    args?: Prisma.SelectSubset<TArgs, Prisma.activityFindManyArgs>,
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
        'activity',
        `${endpoint}/activity/findMany`,
        args,
        options,
        fetch
    )
}

export function useFindUniqueactivity<
    TArgs extends Prisma.activityFindUniqueArgs,
    TQueryFnData = Prisma.activityGetPayload<TArgs> & {
        $optimistic?: boolean
    },
    TData = TQueryFnData,
    TError = DefaultError
>(
    args: Prisma.SelectSubset<TArgs, Prisma.activityFindUniqueArgs>,
    options?: Omit<
        UseQueryOptions<TQueryFnData, TError, TData>,
        'queryKey'
    > &
        ExtraQueryOptions
) {
    const { endpoint, fetch } = getHooksContext()
    return useModelQuery<TQueryFnData, TData, TError>(
        'activity',
        `${endpoint}/activity/findUnique`,
        args,
        options,
        fetch
    )
}

export function useSuspenseFindUniqueactivity<
    TArgs extends Prisma.activityFindUniqueArgs,
    TQueryFnData = Prisma.activityGetPayload<TArgs> & {
        $optimistic?: boolean
    },
    TData = TQueryFnData,
    TError = DefaultError
>(
    args: Prisma.SelectSubset<TArgs, Prisma.activityFindUniqueArgs>,
    options?: Omit<
        UseSuspenseQueryOptions<TQueryFnData, TError, TData>,
        'queryKey'
    > &
        ExtraQueryOptions
) {
    const { endpoint, fetch } = getHooksContext()
    return useSuspenseModelQuery<TQueryFnData, TData, TError>(
        'activity',
        `${endpoint}/activity/findUnique`,
        args,
        options,
        fetch
    )
}

export function useFindFirstactivity<
    TArgs extends Prisma.activityFindFirstArgs,
    TQueryFnData = Prisma.activityGetPayload<TArgs> & {
        $optimistic?: boolean
    },
    TData = TQueryFnData,
    TError = DefaultError
>(
    args?: Prisma.SelectSubset<TArgs, Prisma.activityFindFirstArgs>,
    options?: Omit<
        UseQueryOptions<TQueryFnData, TError, TData>,
        'queryKey'
    > &
        ExtraQueryOptions
) {
    const { endpoint, fetch } = getHooksContext()
    return useModelQuery<TQueryFnData, TData, TError>(
        'activity',
        `${endpoint}/activity/findFirst`,
        args,
        options,
        fetch
    )
}

export function useSuspenseFindFirstactivity<
    TArgs extends Prisma.activityFindFirstArgs,
    TQueryFnData = Prisma.activityGetPayload<TArgs> & {
        $optimistic?: boolean
    },
    TData = TQueryFnData,
    TError = DefaultError
>(
    args?: Prisma.SelectSubset<TArgs, Prisma.activityFindFirstArgs>,
    options?: Omit<
        UseSuspenseQueryOptions<TQueryFnData, TError, TData>,
        'queryKey'
    > &
        ExtraQueryOptions
) {
    const { endpoint, fetch } = getHooksContext()
    return useSuspenseModelQuery<TQueryFnData, TData, TError>(
        'activity',
        `${endpoint}/activity/findFirst`,
        args,
        options,
        fetch
    )
}

export function useUpdateactivity(
    options?: Omit<
        UseMutationOptions<
            activity | undefined,
            DefaultError,
            Prisma.activityUpdateArgs
        > &
            ExtraMutationOptions,
        'mutationFn'
    >
) {
    const { endpoint, fetch } = getHooksContext()
    const _mutation = useModelMutation<
        Prisma.activityUpdateArgs,
        DefaultError,
        activity,
        true
    >(
        'activity',
        'PUT',
        `${endpoint}/activity/update`,
        metadata,
        options,
        fetch,
        true
    )
    const mutation = {
        ..._mutation,
        mutateAsync: async <T extends Prisma.activityUpdateArgs>(
            args: Prisma.SelectSubset<T, Prisma.activityUpdateArgs>,
            options?: Omit<
                UseMutationOptions<
                    | CheckSelect<
                          T,
                          activity,
                          Prisma.activityGetPayload<T>
                      >
                    | undefined,
                    DefaultError,
                    Prisma.SelectSubset<T, Prisma.activityUpdateArgs>
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
                      activity,
                      Prisma.activityGetPayload<T>
                  >
                | undefined
        }
    }
    return mutation
}

export function useUpdateManyactivity(
    options?: Omit<
        UseMutationOptions<
            Prisma.BatchPayload,
            DefaultError,
            Prisma.activityUpdateManyArgs
        > &
            ExtraMutationOptions,
        'mutationFn'
    >
) {
    const { endpoint, fetch } = getHooksContext()
    const _mutation = useModelMutation<
        Prisma.activityUpdateManyArgs,
        DefaultError,
        Prisma.BatchPayload,
        false
    >(
        'activity',
        'PUT',
        `${endpoint}/activity/updateMany`,
        metadata,
        options,
        fetch,
        false
    )
    const mutation = {
        ..._mutation,
        mutateAsync: async <T extends Prisma.activityUpdateManyArgs>(
            args: Prisma.SelectSubset<
                T,
                Prisma.activityUpdateManyArgs
            >,
            options?: Omit<
                UseMutationOptions<
                    Prisma.BatchPayload,
                    DefaultError,
                    Prisma.SelectSubset<
                        T,
                        Prisma.activityUpdateManyArgs
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

export function useUpsertactivity(
    options?: Omit<
        UseMutationOptions<
            activity | undefined,
            DefaultError,
            Prisma.activityUpsertArgs
        > &
            ExtraMutationOptions,
        'mutationFn'
    >
) {
    const { endpoint, fetch } = getHooksContext()
    const _mutation = useModelMutation<
        Prisma.activityUpsertArgs,
        DefaultError,
        activity,
        true
    >(
        'activity',
        'POST',
        `${endpoint}/activity/upsert`,
        metadata,
        options,
        fetch,
        true
    )
    const mutation = {
        ..._mutation,
        mutateAsync: async <T extends Prisma.activityUpsertArgs>(
            args: Prisma.SelectSubset<T, Prisma.activityUpsertArgs>,
            options?: Omit<
                UseMutationOptions<
                    | CheckSelect<
                          T,
                          activity,
                          Prisma.activityGetPayload<T>
                      >
                    | undefined,
                    DefaultError,
                    Prisma.SelectSubset<T, Prisma.activityUpsertArgs>
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
                      activity,
                      Prisma.activityGetPayload<T>
                  >
                | undefined
        }
    }
    return mutation
}

export function useDeleteactivity(
    options?: Omit<
        UseMutationOptions<
            activity | undefined,
            DefaultError,
            Prisma.activityDeleteArgs
        > &
            ExtraMutationOptions,
        'mutationFn'
    >
) {
    const { endpoint, fetch } = getHooksContext()
    const _mutation = useModelMutation<
        Prisma.activityDeleteArgs,
        DefaultError,
        activity,
        true
    >(
        'activity',
        'DELETE',
        `${endpoint}/activity/delete`,
        metadata,
        options,
        fetch,
        true
    )
    const mutation = {
        ..._mutation,
        mutateAsync: async <T extends Prisma.activityDeleteArgs>(
            args: Prisma.SelectSubset<T, Prisma.activityDeleteArgs>,
            options?: Omit<
                UseMutationOptions<
                    | CheckSelect<
                          T,
                          activity,
                          Prisma.activityGetPayload<T>
                      >
                    | undefined,
                    DefaultError,
                    Prisma.SelectSubset<T, Prisma.activityDeleteArgs>
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
                      activity,
                      Prisma.activityGetPayload<T>
                  >
                | undefined
        }
    }
    return mutation
}

export function useDeleteManyactivity(
    options?: Omit<
        UseMutationOptions<
            Prisma.BatchPayload,
            DefaultError,
            Prisma.activityDeleteManyArgs
        > &
            ExtraMutationOptions,
        'mutationFn'
    >
) {
    const { endpoint, fetch } = getHooksContext()
    const _mutation = useModelMutation<
        Prisma.activityDeleteManyArgs,
        DefaultError,
        Prisma.BatchPayload,
        false
    >(
        'activity',
        'DELETE',
        `${endpoint}/activity/deleteMany`,
        metadata,
        options,
        fetch,
        false
    )
    const mutation = {
        ..._mutation,
        mutateAsync: async <T extends Prisma.activityDeleteManyArgs>(
            args: Prisma.SelectSubset<
                T,
                Prisma.activityDeleteManyArgs
            >,
            options?: Omit<
                UseMutationOptions<
                    Prisma.BatchPayload,
                    DefaultError,
                    Prisma.SelectSubset<
                        T,
                        Prisma.activityDeleteManyArgs
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

export function useAggregateActivity<
    TArgs extends Prisma.ActivityAggregateArgs,
    TQueryFnData = Prisma.GetActivityAggregateType<TArgs>,
    TData = TQueryFnData,
    TError = DefaultError
>(
    args: Prisma.SelectSubset<TArgs, Prisma.ActivityAggregateArgs>,
    options?: Omit<
        UseQueryOptions<TQueryFnData, TError, TData>,
        'queryKey'
    > &
        ExtraQueryOptions
) {
    const { endpoint, fetch } = getHooksContext()
    return useModelQuery<TQueryFnData, TData, TError>(
        'Activity',
        `${endpoint}/activity/aggregate`,
        args,
        options,
        fetch
    )
}

export function useSuspenseAggregateActivity<
    TArgs extends Prisma.ActivityAggregateArgs,
    TQueryFnData = Prisma.GetActivityAggregateType<TArgs>,
    TData = TQueryFnData,
    TError = DefaultError
>(
    args: Prisma.SelectSubset<TArgs, Prisma.ActivityAggregateArgs>,
    options?: Omit<
        UseSuspenseQueryOptions<TQueryFnData, TError, TData>,
        'queryKey'
    > &
        ExtraQueryOptions
) {
    const { endpoint, fetch } = getHooksContext()
    return useSuspenseModelQuery<TQueryFnData, TData, TError>(
        'Activity',
        `${endpoint}/activity/aggregate`,
        args,
        options,
        fetch
    )
}

export function useGroupByactivity<
    TArgs extends Prisma.activityGroupByArgs,
    HasSelectOrTake extends Prisma.Or<
        Prisma.Extends<'skip', Prisma.Keys<TArgs>>,
        Prisma.Extends<'take', Prisma.Keys<TArgs>>
    >,
    OrderByArg extends Prisma.True extends HasSelectOrTake
        ? { orderBy: Prisma.activityGroupByArgs['orderBy'] }
        : { orderBy?: Prisma.activityGroupByArgs['orderBy'] },
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
                  Prisma.ActivityGroupByOutputType,
                  TArgs['by']
              > & {
                  [P in keyof TArgs &
                      keyof Prisma.ActivityGroupByOutputType]: P extends '_count'
                      ? TArgs[P] extends boolean
                          ? number
                          : Prisma.GetScalarType<
                                TArgs[P],
                                Prisma.ActivityGroupByOutputType[P]
                            >
                      : Prisma.GetScalarType<
                            TArgs[P],
                            Prisma.ActivityGroupByOutputType[P]
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
            Prisma.activityGroupByArgs,
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
        'activity',
        `${endpoint}/activity/groupBy`,
        args,
        options,
        fetch
    )
}

export function useSuspenseGroupByactivity<
    TArgs extends Prisma.activityGroupByArgs,
    HasSelectOrTake extends Prisma.Or<
        Prisma.Extends<'skip', Prisma.Keys<TArgs>>,
        Prisma.Extends<'take', Prisma.Keys<TArgs>>
    >,
    OrderByArg extends Prisma.True extends HasSelectOrTake
        ? { orderBy: Prisma.activityGroupByArgs['orderBy'] }
        : { orderBy?: Prisma.activityGroupByArgs['orderBy'] },
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
                  Prisma.ActivityGroupByOutputType,
                  TArgs['by']
              > & {
                  [P in keyof TArgs &
                      keyof Prisma.ActivityGroupByOutputType]: P extends '_count'
                      ? TArgs[P] extends boolean
                          ? number
                          : Prisma.GetScalarType<
                                TArgs[P],
                                Prisma.ActivityGroupByOutputType[P]
                            >
                      : Prisma.GetScalarType<
                            TArgs[P],
                            Prisma.ActivityGroupByOutputType[P]
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
            Prisma.activityGroupByArgs,
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
        'activity',
        `${endpoint}/activity/groupBy`,
        args,
        options,
        fetch
    )
}

export function useCountactivity<
    TArgs extends Prisma.activityCountArgs,
    TQueryFnData = TArgs extends { select: any }
        ? TArgs['select'] extends true
            ? number
            : Prisma.GetScalarType<
                  TArgs['select'],
                  Prisma.ActivityCountAggregateOutputType
              >
        : number,
    TData = TQueryFnData,
    TError = DefaultError
>(
    args?: Prisma.SelectSubset<TArgs, Prisma.activityCountArgs>,
    options?: Omit<
        UseQueryOptions<TQueryFnData, TError, TData>,
        'queryKey'
    > &
        ExtraQueryOptions
) {
    const { endpoint, fetch } = getHooksContext()
    return useModelQuery<TQueryFnData, TData, TError>(
        'activity',
        `${endpoint}/activity/count`,
        args,
        options,
        fetch
    )
}

export function useSuspenseCountactivity<
    TArgs extends Prisma.activityCountArgs,
    TQueryFnData = TArgs extends { select: any }
        ? TArgs['select'] extends true
            ? number
            : Prisma.GetScalarType<
                  TArgs['select'],
                  Prisma.ActivityCountAggregateOutputType
              >
        : number,
    TData = TQueryFnData,
    TError = DefaultError
>(
    args?: Prisma.SelectSubset<TArgs, Prisma.activityCountArgs>,
    options?: Omit<
        UseSuspenseQueryOptions<TQueryFnData, TError, TData>,
        'queryKey'
    > &
        ExtraQueryOptions
) {
    const { endpoint, fetch } = getHooksContext()
    return useSuspenseModelQuery<TQueryFnData, TData, TError>(
        'activity',
        `${endpoint}/activity/count`,
        args,
        options,
        fetch
    )
}
import type { ActivityType, EntityType } from '@prisma/client'

export function useCheckactivity<TError = DefaultError>(
    args: {
        operation: PolicyCrudKind
        where?: {
            userId?: string
            activity_log_id?: string
            activity_type?: ActivityType
            entityType?: EntityType
            entityId?: string
            description?: string
            id?: string
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
        'activity',
        `${endpoint}/activity/check`,
        args,
        options,
        fetch
    )
}

/******************************************************************************
 * This file was generated by ZenStack CLI.
 ******************************************************************************/

/* eslint-disable */
// @ts-nocheck

import type { Prisma, system_configurations } from '@prisma/client'
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

export function useCreatesystem_configurations(
    options?: Omit<
        UseMutationOptions<
            system_configurations | undefined,
            DefaultError,
            Prisma.system_configurationsCreateArgs
        > &
            ExtraMutationOptions,
        'mutationFn'
    >
) {
    const { endpoint, fetch } = getHooksContext()
    const _mutation = useModelMutation<
        Prisma.system_configurationsCreateArgs,
        DefaultError,
        system_configurations,
        true
    >(
        'system_configurations',
        'POST',
        `${endpoint}/system_configurations/create`,
        metadata,
        options,
        fetch,
        true
    )
    const mutation = {
        ..._mutation,
        mutateAsync: async <
            T extends Prisma.system_configurationsCreateArgs
        >(
            args: Prisma.SelectSubset<
                T,
                Prisma.system_configurationsCreateArgs
            >,
            options?: Omit<
                UseMutationOptions<
                    | CheckSelect<
                          T,
                          system_configurations,
                          Prisma.system_configurationsGetPayload<T>
                      >
                    | undefined,
                    DefaultError,
                    Prisma.SelectSubset<
                        T,
                        Prisma.system_configurationsCreateArgs
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
                      system_configurations,
                      Prisma.system_configurationsGetPayload<T>
                  >
                | undefined
        }
    }
    return mutation
}

export function useCreateManysystem_configurations(
    options?: Omit<
        UseMutationOptions<
            Prisma.BatchPayload,
            DefaultError,
            Prisma.system_configurationsCreateManyArgs
        > &
            ExtraMutationOptions,
        'mutationFn'
    >
) {
    const { endpoint, fetch } = getHooksContext()
    const _mutation = useModelMutation<
        Prisma.system_configurationsCreateManyArgs,
        DefaultError,
        Prisma.BatchPayload,
        false
    >(
        'system_configurations',
        'POST',
        `${endpoint}/system_configurations/createMany`,
        metadata,
        options,
        fetch,
        false
    )
    const mutation = {
        ..._mutation,
        mutateAsync: async <
            T extends Prisma.system_configurationsCreateManyArgs
        >(
            args: Prisma.SelectSubset<
                T,
                Prisma.system_configurationsCreateManyArgs
            >,
            options?: Omit<
                UseMutationOptions<
                    Prisma.BatchPayload,
                    DefaultError,
                    Prisma.SelectSubset<
                        T,
                        Prisma.system_configurationsCreateManyArgs
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

export function useFindManysystem_configurations<
    TArgs extends Prisma.system_configurationsFindManyArgs,
    TQueryFnData = Array<
        Prisma.system_configurationsGetPayload<TArgs> & {
            $optimistic?: boolean
        }
    >,
    TData = TQueryFnData,
    TError = DefaultError
>(
    args?: Prisma.SelectSubset<
        TArgs,
        Prisma.system_configurationsFindManyArgs
    >,
    options?: Omit<
        UseQueryOptions<TQueryFnData, TError, TData>,
        'queryKey'
    > &
        ExtraQueryOptions
) {
    const { endpoint, fetch } = getHooksContext()
    return useModelQuery<TQueryFnData, TData, TError>(
        'system_configurations',
        `${endpoint}/system_configurations/findMany`,
        args,
        options,
        fetch
    )
}

export function useInfiniteFindManysystem_configurations<
    TArgs extends Prisma.system_configurationsFindManyArgs,
    TQueryFnData = Array<
        Prisma.system_configurationsGetPayload<TArgs>
    >,
    TData = TQueryFnData,
    TError = DefaultError
>(
    args?: Prisma.SelectSubset<
        TArgs,
        Prisma.system_configurationsFindManyArgs
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
        'system_configurations',
        `${endpoint}/system_configurations/findMany`,
        args,
        options,
        fetch
    )
}

export function useSuspenseFindManysystem_configurations<
    TArgs extends Prisma.system_configurationsFindManyArgs,
    TQueryFnData = Array<
        Prisma.system_configurationsGetPayload<TArgs> & {
            $optimistic?: boolean
        }
    >,
    TData = TQueryFnData,
    TError = DefaultError
>(
    args?: Prisma.SelectSubset<
        TArgs,
        Prisma.system_configurationsFindManyArgs
    >,
    options?: Omit<
        UseSuspenseQueryOptions<TQueryFnData, TError, TData>,
        'queryKey'
    > &
        ExtraQueryOptions
) {
    const { endpoint, fetch } = getHooksContext()
    return useSuspenseModelQuery<TQueryFnData, TData, TError>(
        'system_configurations',
        `${endpoint}/system_configurations/findMany`,
        args,
        options,
        fetch
    )
}

export function useSuspenseInfiniteFindManysystem_configurations<
    TArgs extends Prisma.system_configurationsFindManyArgs,
    TQueryFnData = Array<
        Prisma.system_configurationsGetPayload<TArgs>
    >,
    TData = TQueryFnData,
    TError = DefaultError
>(
    args?: Prisma.SelectSubset<
        TArgs,
        Prisma.system_configurationsFindManyArgs
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
        'system_configurations',
        `${endpoint}/system_configurations/findMany`,
        args,
        options,
        fetch
    )
}

export function useFindUniquesystem_configurations<
    TArgs extends Prisma.system_configurationsFindUniqueArgs,
    TQueryFnData = Prisma.system_configurationsGetPayload<TArgs> & {
        $optimistic?: boolean
    },
    TData = TQueryFnData,
    TError = DefaultError
>(
    args: Prisma.SelectSubset<
        TArgs,
        Prisma.system_configurationsFindUniqueArgs
    >,
    options?: Omit<
        UseQueryOptions<TQueryFnData, TError, TData>,
        'queryKey'
    > &
        ExtraQueryOptions
) {
    const { endpoint, fetch } = getHooksContext()
    return useModelQuery<TQueryFnData, TData, TError>(
        'system_configurations',
        `${endpoint}/system_configurations/findUnique`,
        args,
        options,
        fetch
    )
}

export function useSuspenseFindUniquesystem_configurations<
    TArgs extends Prisma.system_configurationsFindUniqueArgs,
    TQueryFnData = Prisma.system_configurationsGetPayload<TArgs> & {
        $optimistic?: boolean
    },
    TData = TQueryFnData,
    TError = DefaultError
>(
    args: Prisma.SelectSubset<
        TArgs,
        Prisma.system_configurationsFindUniqueArgs
    >,
    options?: Omit<
        UseSuspenseQueryOptions<TQueryFnData, TError, TData>,
        'queryKey'
    > &
        ExtraQueryOptions
) {
    const { endpoint, fetch } = getHooksContext()
    return useSuspenseModelQuery<TQueryFnData, TData, TError>(
        'system_configurations',
        `${endpoint}/system_configurations/findUnique`,
        args,
        options,
        fetch
    )
}

export function useFindFirstsystem_configurations<
    TArgs extends Prisma.system_configurationsFindFirstArgs,
    TQueryFnData = Prisma.system_configurationsGetPayload<TArgs> & {
        $optimistic?: boolean
    },
    TData = TQueryFnData,
    TError = DefaultError
>(
    args?: Prisma.SelectSubset<
        TArgs,
        Prisma.system_configurationsFindFirstArgs
    >,
    options?: Omit<
        UseQueryOptions<TQueryFnData, TError, TData>,
        'queryKey'
    > &
        ExtraQueryOptions
) {
    const { endpoint, fetch } = getHooksContext()
    return useModelQuery<TQueryFnData, TData, TError>(
        'system_configurations',
        `${endpoint}/system_configurations/findFirst`,
        args,
        options,
        fetch
    )
}

export function useSuspenseFindFirstsystem_configurations<
    TArgs extends Prisma.system_configurationsFindFirstArgs,
    TQueryFnData = Prisma.system_configurationsGetPayload<TArgs> & {
        $optimistic?: boolean
    },
    TData = TQueryFnData,
    TError = DefaultError
>(
    args?: Prisma.SelectSubset<
        TArgs,
        Prisma.system_configurationsFindFirstArgs
    >,
    options?: Omit<
        UseSuspenseQueryOptions<TQueryFnData, TError, TData>,
        'queryKey'
    > &
        ExtraQueryOptions
) {
    const { endpoint, fetch } = getHooksContext()
    return useSuspenseModelQuery<TQueryFnData, TData, TError>(
        'system_configurations',
        `${endpoint}/system_configurations/findFirst`,
        args,
        options,
        fetch
    )
}

export function useUpdatesystem_configurations(
    options?: Omit<
        UseMutationOptions<
            system_configurations | undefined,
            DefaultError,
            Prisma.system_configurationsUpdateArgs
        > &
            ExtraMutationOptions,
        'mutationFn'
    >
) {
    const { endpoint, fetch } = getHooksContext()
    const _mutation = useModelMutation<
        Prisma.system_configurationsUpdateArgs,
        DefaultError,
        system_configurations,
        true
    >(
        'system_configurations',
        'PUT',
        `${endpoint}/system_configurations/update`,
        metadata,
        options,
        fetch,
        true
    )
    const mutation = {
        ..._mutation,
        mutateAsync: async <
            T extends Prisma.system_configurationsUpdateArgs
        >(
            args: Prisma.SelectSubset<
                T,
                Prisma.system_configurationsUpdateArgs
            >,
            options?: Omit<
                UseMutationOptions<
                    | CheckSelect<
                          T,
                          system_configurations,
                          Prisma.system_configurationsGetPayload<T>
                      >
                    | undefined,
                    DefaultError,
                    Prisma.SelectSubset<
                        T,
                        Prisma.system_configurationsUpdateArgs
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
                      system_configurations,
                      Prisma.system_configurationsGetPayload<T>
                  >
                | undefined
        }
    }
    return mutation
}

export function useUpdateManysystem_configurations(
    options?: Omit<
        UseMutationOptions<
            Prisma.BatchPayload,
            DefaultError,
            Prisma.system_configurationsUpdateManyArgs
        > &
            ExtraMutationOptions,
        'mutationFn'
    >
) {
    const { endpoint, fetch } = getHooksContext()
    const _mutation = useModelMutation<
        Prisma.system_configurationsUpdateManyArgs,
        DefaultError,
        Prisma.BatchPayload,
        false
    >(
        'system_configurations',
        'PUT',
        `${endpoint}/system_configurations/updateMany`,
        metadata,
        options,
        fetch,
        false
    )
    const mutation = {
        ..._mutation,
        mutateAsync: async <
            T extends Prisma.system_configurationsUpdateManyArgs
        >(
            args: Prisma.SelectSubset<
                T,
                Prisma.system_configurationsUpdateManyArgs
            >,
            options?: Omit<
                UseMutationOptions<
                    Prisma.BatchPayload,
                    DefaultError,
                    Prisma.SelectSubset<
                        T,
                        Prisma.system_configurationsUpdateManyArgs
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

export function useUpsertsystem_configurations(
    options?: Omit<
        UseMutationOptions<
            system_configurations | undefined,
            DefaultError,
            Prisma.system_configurationsUpsertArgs
        > &
            ExtraMutationOptions,
        'mutationFn'
    >
) {
    const { endpoint, fetch } = getHooksContext()
    const _mutation = useModelMutation<
        Prisma.system_configurationsUpsertArgs,
        DefaultError,
        system_configurations,
        true
    >(
        'system_configurations',
        'POST',
        `${endpoint}/system_configurations/upsert`,
        metadata,
        options,
        fetch,
        true
    )
    const mutation = {
        ..._mutation,
        mutateAsync: async <
            T extends Prisma.system_configurationsUpsertArgs
        >(
            args: Prisma.SelectSubset<
                T,
                Prisma.system_configurationsUpsertArgs
            >,
            options?: Omit<
                UseMutationOptions<
                    | CheckSelect<
                          T,
                          system_configurations,
                          Prisma.system_configurationsGetPayload<T>
                      >
                    | undefined,
                    DefaultError,
                    Prisma.SelectSubset<
                        T,
                        Prisma.system_configurationsUpsertArgs
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
                      system_configurations,
                      Prisma.system_configurationsGetPayload<T>
                  >
                | undefined
        }
    }
    return mutation
}

export function useDeletesystem_configurations(
    options?: Omit<
        UseMutationOptions<
            system_configurations | undefined,
            DefaultError,
            Prisma.system_configurationsDeleteArgs
        > &
            ExtraMutationOptions,
        'mutationFn'
    >
) {
    const { endpoint, fetch } = getHooksContext()
    const _mutation = useModelMutation<
        Prisma.system_configurationsDeleteArgs,
        DefaultError,
        system_configurations,
        true
    >(
        'system_configurations',
        'DELETE',
        `${endpoint}/system_configurations/delete`,
        metadata,
        options,
        fetch,
        true
    )
    const mutation = {
        ..._mutation,
        mutateAsync: async <
            T extends Prisma.system_configurationsDeleteArgs
        >(
            args: Prisma.SelectSubset<
                T,
                Prisma.system_configurationsDeleteArgs
            >,
            options?: Omit<
                UseMutationOptions<
                    | CheckSelect<
                          T,
                          system_configurations,
                          Prisma.system_configurationsGetPayload<T>
                      >
                    | undefined,
                    DefaultError,
                    Prisma.SelectSubset<
                        T,
                        Prisma.system_configurationsDeleteArgs
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
                      system_configurations,
                      Prisma.system_configurationsGetPayload<T>
                  >
                | undefined
        }
    }
    return mutation
}

export function useDeleteManysystem_configurations(
    options?: Omit<
        UseMutationOptions<
            Prisma.BatchPayload,
            DefaultError,
            Prisma.system_configurationsDeleteManyArgs
        > &
            ExtraMutationOptions,
        'mutationFn'
    >
) {
    const { endpoint, fetch } = getHooksContext()
    const _mutation = useModelMutation<
        Prisma.system_configurationsDeleteManyArgs,
        DefaultError,
        Prisma.BatchPayload,
        false
    >(
        'system_configurations',
        'DELETE',
        `${endpoint}/system_configurations/deleteMany`,
        metadata,
        options,
        fetch,
        false
    )
    const mutation = {
        ..._mutation,
        mutateAsync: async <
            T extends Prisma.system_configurationsDeleteManyArgs
        >(
            args: Prisma.SelectSubset<
                T,
                Prisma.system_configurationsDeleteManyArgs
            >,
            options?: Omit<
                UseMutationOptions<
                    Prisma.BatchPayload,
                    DefaultError,
                    Prisma.SelectSubset<
                        T,
                        Prisma.system_configurationsDeleteManyArgs
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

export function useAggregateSystem_configurations<
    TArgs extends Prisma.System_configurationsAggregateArgs,
    TQueryFnData = Prisma.GetSystem_configurationsAggregateType<TArgs>,
    TData = TQueryFnData,
    TError = DefaultError
>(
    args: Prisma.SelectSubset<
        TArgs,
        Prisma.System_configurationsAggregateArgs
    >,
    options?: Omit<
        UseQueryOptions<TQueryFnData, TError, TData>,
        'queryKey'
    > &
        ExtraQueryOptions
) {
    const { endpoint, fetch } = getHooksContext()
    return useModelQuery<TQueryFnData, TData, TError>(
        'System_configurations',
        `${endpoint}/system_configurations/aggregate`,
        args,
        options,
        fetch
    )
}

export function useSuspenseAggregateSystem_configurations<
    TArgs extends Prisma.System_configurationsAggregateArgs,
    TQueryFnData = Prisma.GetSystem_configurationsAggregateType<TArgs>,
    TData = TQueryFnData,
    TError = DefaultError
>(
    args: Prisma.SelectSubset<
        TArgs,
        Prisma.System_configurationsAggregateArgs
    >,
    options?: Omit<
        UseSuspenseQueryOptions<TQueryFnData, TError, TData>,
        'queryKey'
    > &
        ExtraQueryOptions
) {
    const { endpoint, fetch } = getHooksContext()
    return useSuspenseModelQuery<TQueryFnData, TData, TError>(
        'System_configurations',
        `${endpoint}/system_configurations/aggregate`,
        args,
        options,
        fetch
    )
}

export function useGroupBysystem_configurations<
    TArgs extends Prisma.system_configurationsGroupByArgs,
    HasSelectOrTake extends Prisma.Or<
        Prisma.Extends<'skip', Prisma.Keys<TArgs>>,
        Prisma.Extends<'take', Prisma.Keys<TArgs>>
    >,
    OrderByArg extends Prisma.True extends HasSelectOrTake
        ? {
              orderBy: Prisma.system_configurationsGroupByArgs['orderBy']
          }
        : {
              orderBy?: Prisma.system_configurationsGroupByArgs['orderBy']
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
                  Prisma.System_configurationsGroupByOutputType,
                  TArgs['by']
              > & {
                  [P in keyof TArgs &
                      keyof Prisma.System_configurationsGroupByOutputType]: P extends '_count'
                      ? TArgs[P] extends boolean
                          ? number
                          : Prisma.GetScalarType<
                                TArgs[P],
                                Prisma.System_configurationsGroupByOutputType[P]
                            >
                      : Prisma.GetScalarType<
                            TArgs[P],
                            Prisma.System_configurationsGroupByOutputType[P]
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
            Prisma.system_configurationsGroupByArgs,
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
        'system_configurations',
        `${endpoint}/system_configurations/groupBy`,
        args,
        options,
        fetch
    )
}

export function useSuspenseGroupBysystem_configurations<
    TArgs extends Prisma.system_configurationsGroupByArgs,
    HasSelectOrTake extends Prisma.Or<
        Prisma.Extends<'skip', Prisma.Keys<TArgs>>,
        Prisma.Extends<'take', Prisma.Keys<TArgs>>
    >,
    OrderByArg extends Prisma.True extends HasSelectOrTake
        ? {
              orderBy: Prisma.system_configurationsGroupByArgs['orderBy']
          }
        : {
              orderBy?: Prisma.system_configurationsGroupByArgs['orderBy']
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
                  Prisma.System_configurationsGroupByOutputType,
                  TArgs['by']
              > & {
                  [P in keyof TArgs &
                      keyof Prisma.System_configurationsGroupByOutputType]: P extends '_count'
                      ? TArgs[P] extends boolean
                          ? number
                          : Prisma.GetScalarType<
                                TArgs[P],
                                Prisma.System_configurationsGroupByOutputType[P]
                            >
                      : Prisma.GetScalarType<
                            TArgs[P],
                            Prisma.System_configurationsGroupByOutputType[P]
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
            Prisma.system_configurationsGroupByArgs,
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
        'system_configurations',
        `${endpoint}/system_configurations/groupBy`,
        args,
        options,
        fetch
    )
}

export function useCountsystem_configurations<
    TArgs extends Prisma.system_configurationsCountArgs,
    TQueryFnData = TArgs extends { select: any }
        ? TArgs['select'] extends true
            ? number
            : Prisma.GetScalarType<
                  TArgs['select'],
                  Prisma.System_configurationsCountAggregateOutputType
              >
        : number,
    TData = TQueryFnData,
    TError = DefaultError
>(
    args?: Prisma.SelectSubset<
        TArgs,
        Prisma.system_configurationsCountArgs
    >,
    options?: Omit<
        UseQueryOptions<TQueryFnData, TError, TData>,
        'queryKey'
    > &
        ExtraQueryOptions
) {
    const { endpoint, fetch } = getHooksContext()
    return useModelQuery<TQueryFnData, TData, TError>(
        'system_configurations',
        `${endpoint}/system_configurations/count`,
        args,
        options,
        fetch
    )
}

export function useSuspenseCountsystem_configurations<
    TArgs extends Prisma.system_configurationsCountArgs,
    TQueryFnData = TArgs extends { select: any }
        ? TArgs['select'] extends true
            ? number
            : Prisma.GetScalarType<
                  TArgs['select'],
                  Prisma.System_configurationsCountAggregateOutputType
              >
        : number,
    TData = TQueryFnData,
    TError = DefaultError
>(
    args?: Prisma.SelectSubset<
        TArgs,
        Prisma.system_configurationsCountArgs
    >,
    options?: Omit<
        UseSuspenseQueryOptions<TQueryFnData, TError, TData>,
        'queryKey'
    > &
        ExtraQueryOptions
) {
    const { endpoint, fetch } = getHooksContext()
    return useSuspenseModelQuery<TQueryFnData, TData, TError>(
        'system_configurations',
        `${endpoint}/system_configurations/count`,
        args,
        options,
        fetch
    )
}

export function useChecksystem_configurations<TError = DefaultError>(
    args: {
        operation: PolicyCrudKind
        where?: {
            id?: string
            key?: string
            description?: string
            updated_by?: string
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
        'system_configurations',
        `${endpoint}/system_configurations/check`,
        args,
        options,
        fetch
    )
}
